import { readFile, mkdir, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = async (path) =>
  JSON.parse(await readFile(resolve(root, path), "utf8"));
const config = await readJson("src/lib/checklist/printables.json");
const english = await readJson("src/const/declutter-checklist.json");
const escapeHtml = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
let executablePath;
for (const candidate of candidates) {
  if (
    await access(candidate).then(
      () => true,
      () => false,
    )
  ) {
    executablePath = candidate;
    break;
  }
}
if (!executablePath)
  throw new Error("Install Chrome or set CHROME_PATH to its executable.");

const requestedLocale = process.argv
  .find((arg) => arg.startsWith("--locale="))
  ?.split("=")[1];
if (requestedLocale && !config.copy[requestedLocale])
  throw new Error(`Unknown locale: ${requestedLocale}`);

const browser = await chromium.launch({ executablePath, headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 794, height: 1123 },
    deviceScaleFactor: 1.5,
  });
  for (const [locale, copy] of Object.entries(config.copy)) {
    if (requestedLocale && requestedLocale !== locale) continue;
    const localized =
      locale === "en"
        ? english
        : await readJson(`src/const/declutter-checklist.${locale}.json`);
    const output = resolve(root, "public/checklists", locale);
    await mkdir(output, { recursive: true });

    for (const area of config.areas) {
      const index = english.findIndex(
        (category) => category.category === area.sourceCategory,
      );
      const category = localized[index];
      if (!category || category.items.length !== english[index].items.length) {
        throw new Error(
          `Incomplete checklist translation: ${locale}/${area.slug}`,
        );
      }
      const title =
        config.titleOverrides?.[locale]?.[area.slug] ??
        copy.title.replace("{area}", category.category);
      const items = [...category.items].sort((a, b) =>
        a.localeCompare(b, locale),
      );
      const pageCount = Math.ceil(items.length / config.itemsPerPage);
      const sheets = Array.from(
        { length: pageCount },
        (_, i) => `
        <section class="sheet">
          <header><p class="brand">DECLUTTER YOUR HOME</p><p class="edition">${escapeHtml(copy.format)}</p></header>
          <h1>${escapeHtml(title)}</h1>
          <p class="intro">${escapeHtml(copy.intro)}</p>
           <p class="specs">${escapeHtml(
             copy.specs
               .replace("{items}", items.length)
               .replace("{pages}", pageCount)
               .replace("{pageUnit}", copy.pageUnit[pageCount === 1 ? 0 : 1])
               .replace("{language}", copy.language),
           )}</p>
          <ol start="${i * config.itemsPerPage + 1}">${items
            .slice(i * config.itemsPerPage, (i + 1) * config.itemsPerPage)
            .map(
              (item) =>
                `<li><span class="box"></span><span>${escapeHtml(item)}</span></li>`,
            )
            .join("")}</ol>
          <div class="notes"><p>${escapeHtml(copy.notes)}</p><div></div><div></div></div>
          <footer><a href="https://declutteryourhome.net/${locale}/declutter-checklist/${area.slug}">declutteryourhome.net</a><span>${escapeHtml(copy.page.replace("{current}", i + 1).replace("{total}", pageCount))}</span></footer>
        </section>`,
      ).join("");

      await page.setContent(`<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>
        @page { size: A4; margin: 0; }
        * { box-sizing: border-box; }
        body { margin: 0; color: #002d1c; font-family: Arial, "PingFang SC", "Hiragino Sans", "Microsoft YaHei", sans-serif; }
        .sheet { width: 210mm; height: 297mm; padding: 15mm 16mm 11mm; display: flex; flex-direction: column; background: #fff; break-after: page; }
        .sheet:last-child { break-after: auto; }
        header, footer { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
        header { padding-bottom: 15px; border-bottom: 2px solid #2b694d; }
        .brand { font-size: 11px; letter-spacing: 2px; font-weight: 700; }
        .edition { font-size: 12px; }
        h1 { font-size: 32px; line-height: 1.25; letter-spacing: -1px; margin: 24px 0 12px; }
        .intro { font-size: 15px; line-height: 1.6; color: #414844; margin: 0; }
        .specs { font-size: 12px; padding: 10px 0 15px; border-bottom: 1px solid #dfe4d7; margin: 12px 0 0; }
        ol { list-style: none; margin: 10px 0 0; padding: 0; }
        li { display: flex; align-items: center; gap: 14px; min-height: 43px; padding: 10px 0; border-bottom: 1px solid #e7eadf; font-size: 16px; line-height: 1.45; color: #28302c; }
        .box { width: 18px; height: 18px; border: 1.5px solid #7b9385; border-radius: 3px; flex-shrink: 0; }
        .notes { margin-top: auto; padding-top: 16px; font-size: 12px; color: #59615d; }
        .notes div { height: 23px; border-bottom: 1px solid #e7eadf; }
        footer { margin-top: 20px; font-size: 11px; color: #59615d; }
        footer a { color: inherit; text-decoration: none; }
      </style></head><body>${sheets}</body></html>`);
      await page.evaluate(() => document.fonts.ready);
      const overflowing = await page
        .locator(".sheet")
        .evaluateAll((sheets) =>
          sheets.some((sheet) => sheet.scrollHeight > sheet.clientHeight + 1),
        );
      if (overflowing)
        throw new Error(`Print layout overflow: ${locale}/${area.slug}`);
      const base = resolve(output, `${area.slug}-declutter-checklist`);
      await page.pdf({
        path: `${base}.pdf`,
        preferCSSPageSize: true,
        printBackground: true,
        tagged: true,
      });
      const preview = await page.locator(".sheet").first().screenshot();
      await sharp(preview)
        .resize({ width: 960 })
        .webp({ quality: 85 })
        .toFile(`${base}.webp`);
      console.log(
        `${locale}/${area.slug}: ${items.length} items, ${pageCount} pages`,
      );
    }
  }
} finally {
  await browser.close();
}
