import assert from "node:assert/strict";
import config from "../src/lib/checklist/printables.json" with { type: "json" };

// Run against `npm run start -- --port 3107` (or pass a preview base URL).
const base = process.env.SEO_BASE_URL || "http://localhost:3107";
const site = "https://declutteryourhome.net";
let checked = 0;
async function get(path, status = 200) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  assert.equal(response.status, status, path);
  checked++;
  return response;
}

for (const locale of Object.keys(config.copy)) {
  const hub = await (await get(`/${locale}/declutter-checklist`)).text();
  assert.equal((hub.match(/<h1[ >]/g) || []).length, 1, `${locale}: hub H1`);
  assert.ok(
    hub.includes('href="#interactive-checklist"'),
    `${locale}: direct online link`,
  );
  assert.ok(
    hub.includes('href="#printable-checklists"'),
    `${locale}: resources link`,
  );
  assert.ok(hub.indexOf("<h1") < hub.indexOf('id="printable-checklists"'));
  assert.ok(
    hub.indexOf('id="printable-checklists"') <
      hub.indexOf('id="interactive-checklist"'),
  );
  assert.ok(
    hub.indexOf('type="checkbox"') < hub.indexOf("bg-[#fff4df]"),
    `${locale}: tasks precede sync`,
  );
  const footer = hub.match(/<footer[\s\S]*?<\/footer>/)?.[0];
  assert.ok(footer, `${locale}: resource footer rendered in HTML`);
  assert.ok(
    footer.includes(
      `href="/${locale === "de" ? "en" : locale}/privacy-policy"`,
    ),
  );
  assert.ok(
    footer.includes(
      `href="/${locale === "de" ? "en" : locale}/customer-service-policy"`,
    ),
  );
  if (locale === "es") {
    assert.ok(!footer.includes("/how-to-declutter-"));
    assert.ok(footer.includes("/es/como-ordenar-la-cocina"));
  }
  for (const { slug } of config.areas) {
    const path = `/${locale}/declutter-checklist/${slug}`;
    const asset = `/checklists/${locale}/${slug}-declutter-checklist`;
    const html = await (await get(path)).text();
    assert.ok(
      html.includes(`rel="canonical" href="${site}${path}"`),
      `${path}: canonical`,
    );
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: one H1`);
    assert.ok(html.includes(`href="${asset}.pdf"`), `${path}: real PDF link`);
    assert.ok(
      html.includes(`content="${site}${asset}.webp"`),
      `${path}: OG preview`,
    );
    assert.ok(hub.includes(`href="${asset}.pdf"`), `${path}: hub download`);
    assert.ok(hub.includes(`href="${path}"`), `${path}: hub navigation`);
    for (const related of config.areas.filter((area) => area.slug !== slug)) {
      assert.ok(
        html.includes(`href="/${locale}/declutter-checklist/${related.slug}"`),
        `${path}: related ${related.slug}`,
      );
    }
    const pdf = await get(`${asset}.pdf`);
    assert.match(pdf.headers.get("content-type") || "", /application\/pdf/);
    assert.equal(
      Buffer.from(await pdf.arrayBuffer())
        .subarray(0, 5)
        .toString(),
      "%PDF-",
    );
    const image = await get(`${asset}.webp`);
    assert.match(image.headers.get("content-type") || "", /image\/webp/);
  }
  for (const tool of ["progress", "upload"]) {
    const path = `/${locale}/declutter-checklist/${tool}`;
    const html = await (await get(path)).text();
    assert.match(html, /name="robots" content="noindex/);
    assert.ok(
      !html.includes("<footer"),
      `${path}: no resource footer on tools`,
    );
    assert.ok(
      !html.includes('rel="canonical"'),
      `${path}: no inherited homepage canonical`,
    );
  }
}

for (const path of [
  "/de/adhd-cleaning-checklist",
  "/de/how-to-declutter-your-closet",
  "/en/kleiderschrank-ausmisten",
  "/de/50-dinge-ausmisten",
  "/es/adhd-cleaning-checklist",
  "/es/cost-per-wear-calculator",
  "/es/how-to-declutter-your-bedroom",
  "/en/como-ordenar-armarios",
  "/zh/danshari-yarikata",
  "/ja/how-to-declutter-old-cards-and-letters",
  "/en/declutter-checklist/missing-room",
]) {
  const html = await (await get(path, 404)).text();
  assert.match(html, /name="robots" content="noindex/);
}

for (const path of ["/de", "/de/kleiderschrank-ausmisten"]) {
  const html = await (await get(path)).text();
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: one H1`);
  assert.ok(
    html.includes(`rel="canonical" href="${site}${path}"`),
    `${path}: canonical`,
  );
  assert.ok(
    html.includes('href="/de/declutter-checklist"'),
    `${path}: checklist link`,
  );
  assert.ok(html.includes("FAQPage"), `${path}: FAQ schema`);
  if (path.endsWith("kleiderschrank-ausmisten")) {
    assert.ok(html.includes('hrefLang="de"'), `${path}: German alternate`);
    assert.ok(
      !html.includes('hrefLang="en"'),
      `${path}: no untranslated alternate`,
    );
  }
}

const sitemap = await (await get("/sitemap.xml")).text();
assert.ok(!sitemap.includes("/es/adhd-cleaning-checklist"));
assert.ok(sitemap.includes(`${site}/de/kleiderschrank-ausmisten`));
assert.ok(!sitemap.includes(`${site}/de/how-to-declutter-your-closet`));
assert.ok(!sitemap.includes(`${site}/de/adhd-cleaning-checklist`));
assert.ok(!sitemap.includes("/declutter-checklist/progress"));
assert.ok(!sitemap.includes("/declutter-checklist/upload"));
for (const locale of Object.keys(config.copy)) {
  for (const { slug } of config.areas) {
    assert.ok(
      sitemap.includes(
        `${site}/checklists/${locale}/${slug}-declutter-checklist.webp`,
      ),
    );
  }
}
console.log(
  `SEO smoke check passed: ${checked} responses, including all ${Object.keys(config.copy).length * config.areas.length} PDFs and previews.`,
);
