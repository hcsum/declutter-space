// Browser regression checks. Requires the web-access proxy, a running local app,
// and a disposable local database. Never uses the repository's production .env.
import assert from "node:assert/strict";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const databaseUrl = process.env.SHARING_QA_DATABASE_URL;
const secret = process.env.SHARING_QA_SESSION_SECRET;
assert(
  databaseUrl && secret,
  "Set SHARING_QA_DATABASE_URL and SHARING_QA_SESSION_SECRET",
);
const database = new URL(databaseUrl);
assert(
  ["localhost", "127.0.0.1"].includes(database.hostname) &&
    database.pathname.endsWith("_qa"),
  "Use a disposable local *_qa database",
);
const base = process.env.SHARING_QA_BASE_URL || "http://localhost:3000";
assert(
  ["localhost", "127.0.0.1"].includes(new URL(base).hostname),
  "Local app only",
);
const db = new PrismaClient({ datasourceUrl: databaseUrl });
const userId = "interaction-qa-owner";
let target;
let originalCookie;
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function evaluate(body) {
  const response = await fetch(`http://localhost:3456/eval?target=${target}`, {
    method: "POST",
    body,
  });
  const result = await response.json();
  if (result.error) throw new Error(result.error);
  return result.value;
}
async function until(body) {
  for (let i = 0; i < 150; i++) {
    const value = await evaluate(body);
    if (value) return value;
    await pause(200);
  }
  throw new Error(`Timed out: ${body}`);
}
async function input(selector, value, prototype = "HTMLInputElement") {
  await evaluate(
    `(()=>{const el=document.querySelector(${JSON.stringify(selector)});Object.getOwnPropertyDescriptor(${prototype}.prototype,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));return true;})()`,
  );
}
async function click(text, scope = "document") {
  await evaluate(
    `(()=>{const b=Array.from(${scope}.querySelectorAll('button')).find(b=>b.textContent.trim()===${JSON.stringify(text)});if(!b||b.disabled)throw Error('Button unavailable: '+${JSON.stringify(text)});b.click();return true;})()`,
  );
}
const dialog = `document.querySelector('[role="dialog"]')`;
function card(name) {
  return `Array.from(document.querySelectorAll('h3')).find(h=>h.textContent===${JSON.stringify(name)})?.closest('.group')`;
}
async function gate(post, items) {
  await evaluate(
    `window.__qa.post=${post};window.__qa.items=${items};window.__qa.posts=0;true`,
  );
}
async function release(kind) {
  await evaluate(
    `window.__qa.${kind}=false;window.__qa.waiters.${kind}.splice(0).forEach(r=>r());true`,
  );
}
async function openShare(name) {
  await click("分享物品", card(name));
  await until(
    `!${dialog}?.innerText.includes('正在加载分享信息') && !!${dialog}?.querySelector('img')?.naturalWidth`,
  );
}
async function closeShare() {
  await evaluate(
    `${dialog}.querySelector('button[aria-label="关闭"]').click();true`,
  );
  await until(`!document.querySelector('[role="dialog"]')`);
}

try {
  await db.item.deleteMany({ where: { userId } });
  await db.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      name: "Interaction QA",
      email: "interaction-qa@example.invalid",
      password: "disabled",
      isVerified: true,
    },
  });
  for (const [suffix, name, image] of [
    ["camera", "QA 相机", "/camera.webp"],
    ["photo", "QA 没有照片", null],
    ["keep", "QA 保留", null],
    ["delete", "QA 放手", null],
  ]) {
    await db.item.create({
      data: {
        id: `interaction-qa-${suffix}`,
        userId,
        name,
        image,
        pieces: 1,
        startDate: new Date(),
        deadline: new Date("2027-01-01"),
        plan: "UNDECIDED",
      },
    });
  }
  const originalShare = await db.itemShare.create({
    data: {
      itemId: "interaction-qa-camera",
      story: "原来的描述",
      image: "/camera.webp",
    },
  });
  const response = await fetch(`${base}/zh/decluttering-decision-guide`);
  const initialHtml = await response.text();
  assert(
    initialHtml.includes("正在加载物品"),
    "SSR starts with a loading skeleton",
  );
  const page = await (
    await fetch(
      `http://localhost:3456/new?url=${encodeURIComponent(`${base}/zh/decluttering-decision-guide`)}`,
    )
  ).json();
  target = page.targetId;
  originalCookie = await evaluate(
    `document.cookie.split('; ').find(c=>c.startsWith('session=')) || null`,
  );
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(secret));
  await evaluate(
    `document.cookie=${JSON.stringify(`session=${token}; path=/; SameSite=Lax`)};location.reload();true`,
  );
  await until(`!!${card("QA 相机")}`);
  await evaluate(
    `window.__qa={post:false,items:false,posts:0,waiters:{post:[],items:[]},originalFetch:window.fetch};window.fetch=async(...args)=>{const options=args[1];const isPost=!!(options?.headers&&new Headers(options.headers).get('Next-Action'));if(isPost){window.__qa.posts++;if(window.__qa.post)await new Promise(r=>window.__qa.waiters.post.push(r));if(window.__qa.failAction)throw new TypeError('QA network failure');}if(String(args[0])==='/api/items'){if(window.__qa.items)await new Promise(r=>window.__qa.waiters.items.push(r));if(window.__qa.failItems)return new Response(JSON.stringify({error:'QA failure'}),{status:500,headers:{'Content-Type':'application/json'}});}return window.__qa.originalFetch.apply(window,args);};true`,
  );

  await gate(true, true);
  await input('form input[type="text"]', "QA 新增物品");
  await evaluate(
    `(()=>{const f=document.querySelector('form');for(let i=0;i<3;i++)f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));return true;})()`,
  );
  await until(`window.__qa.waiters.post.length===1`);
  assert.equal(
    await evaluate(`window.__qa.posts`),
    1,
    "Repeated Enter must not duplicate the request",
  );
  assert(
    await evaluate(
      `document.querySelector('form').innerText.includes('正在保存') && document.querySelector('form input').disabled`,
    ),
  );
  await release("post");
  await until(`window.__qa.waiters.items.length===1`);
  assert(
    await evaluate(
      `document.querySelector('form').innerText.includes('正在保存') && document.querySelector('form input').disabled`,
    ),
    "Keep loading until the refresh completes",
  );
  await release("items");
  await until(`!!${card("QA 新增物品")}`);
  assert.equal(
    await db.item.count({ where: { userId, name: "QA 新增物品" } }),
    1,
  );
  console.log(
    "PASS initial skeleton, save spinner, disabled fields, duplicate-submit prevention, loading through refresh",
  );

  await evaluate(`window.__qa.failAction=true;true`);
  await input('form input[type="text"]', "QA 创建失败");
  await evaluate(
    `document.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));true`,
  );
  await until(
    `document.querySelector('[role="alert"]')?.innerText.includes('保存失败')`,
  );
  assert(
    await evaluate(
      `document.querySelector('form input').value==='QA 创建失败'&&!document.querySelector('form input').disabled`,
    ),
  );
  assert.equal(
    await db.item.count({ where: { userId, name: "QA 创建失败" } }),
    0,
  );
  await evaluate(
    `window.__qa.failAction=false;window.__qa.failItems=true;true`,
  );
  await input('form input[type="text"]', "QA 刷新失败");
  await evaluate(
    `document.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));true`,
  );
  await until(`document.body.innerText.includes('修改已保存，但列表刷新失败')`);
  assert.equal(
    await db.item.count({ where: { userId, name: "QA 刷新失败" } }),
    1,
  );
  assert(
    await evaluate(
      `document.querySelector('form input').value===''&&!document.querySelector('form input').disabled`,
    ),
  );
  await evaluate(`window.__qa.failItems=false;true`);
  await click("重新加载物品");
  await until(`!!${card("QA 刷新失败")}`);
  console.log(
    "PASS failed saves preserve input; refresh failures report that saving succeeded and retry only reloads the list",
  );

  for (const [name, label, loading, suffix] of [
    ["QA 保留", "留下", "正在保留", "keep"],
    ["QA 放手", "放手", "正在移除", "delete"],
  ]) {
    await gate(true, true);
    await click(label, card(name));
    await click("确认", dialog);
    await until(`window.__qa.waiters.post.length===1`);
    assert(
      await evaluate(
        `${card(name)}.innerText.includes(${JSON.stringify(loading)})`,
      ),
    );
    await release("post");
    await until(`window.__qa.waiters.items.length===1`);
    assert(await evaluate(`${card(name)}.getAttribute('aria-busy')==='true'`));
    await release("items");
    await until(`!${card(name)}`);
    const item = await db.item.findUnique({
      where: { id: `interaction-qa-${suffix}` },
    });
    assert(suffix === "keep" ? !!item?.archivedAt : item === null);
  }
  console.log(
    "PASS keep/remove have distinct loading feedback until the list refresh completes",
  );

  await openShare("QA 相机");
  const savedButton = await evaluate(
    `(()=>{const b=Array.from(${dialog}.querySelectorAll('button')).find(b=>b.textContent.trim()==='已保存');return {disabled:b?.disabled,cursor:b&&getComputedStyle(b).cursor};})()`,
  );
  assert(savedButton.disabled);
  assert.equal(savedButton.cursor, "default");
  await evaluate(
    `window.__qa.previewImage=${dialog}.querySelector('img');window.__qa.sourceLoads=0;window.__qa.srcDescriptor=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');Object.defineProperty(HTMLImageElement.prototype,'src',{...window.__qa.srcDescriptor,set(value){if(value==='/camera.webp')window.__qa.sourceLoads++;return window.__qa.srcDescriptor.set.call(this,value);}});true`,
  );
  for (const description of ["这", "这是一", "这是一段新的描述"]) {
    await input("#share-story", description, "HTMLTextAreaElement");
    assert(
      await evaluate(
        `${dialog}.querySelector('img')===window.__qa.previewImage`,
      ),
      "The preview image must remain mounted",
    );
    await pause(250);
  }
  await until(
    `!${dialog}.querySelector('[aria-busy]')?.getAttribute('aria-busy') || ${dialog}.querySelector('[aria-busy]').getAttribute('aria-busy')==='false'`,
  );
  assert.equal(
    await evaluate(`window.__qa.sourceLoads`),
    0,
    "Typing should not load the source photograph again",
  );
  await input("#share-story", "原来的描述", "HTMLTextAreaElement");
  await until(
    `Array.from(${dialog}.querySelectorAll('button')).some(b=>b.textContent.trim()==='已保存'&&b.disabled)`,
  );
  await input("#share-story", "这是一段新的描述", "HTMLTextAreaElement");
  await gate(true, false);
  await click("保存更改", dialog);
  await until(`window.__qa.waiters.post.length===1`);
  assert(
    await evaluate(
      `${dialog}.innerText.includes('正在保存更改') && ${dialog}.querySelector('textarea').disabled`,
    ),
  );
  await release("post");
  await until(
    `Array.from(${dialog}.querySelectorAll('button')).some(b=>b.textContent.trim()==='已保存')`,
  );
  const updated = await db.itemShare.findUniqueOrThrow({
    where: { itemId: "interaction-qa-camera" },
  });
  assert.equal(updated.token, originalShare.token);
  assert.equal(updated.story, "这是一段新的描述");
  assert(
    (await (await fetch(`${base}/zh/share/${updated.token}`)).text()).includes(
      "这是一段新的描述",
    ),
  );
  await input("#share-story", "未能保存的描述", "HTMLTextAreaElement");
  await evaluate(`window.__qa.failAction=true;true`);
  await click("保存更改", dialog);
  await until(
    `${dialog}.querySelector('[role="alert"]')?.innerText.includes('操作失败')`,
  );
  assert.equal(
    (
      await db.itemShare.findUniqueOrThrow({
        where: { itemId: "interaction-qa-camera" },
      })
    ).story,
    "这是一段新的描述",
  );
  assert(
    await evaluate(
      `!${dialog}.querySelector('textarea').disabled&&${dialog}.querySelector('textarea').value==='未能保存的描述'`,
    ),
  );
  await evaluate(`window.__qa.failAction=false;true`);
  await evaluate(
    `Object.defineProperty(HTMLImageElement.prototype,'src',window.__qa.srcDescriptor);true`,
  );
  await closeShare();
  console.log(
    "PASS description edits retain preview and reuse the source photo; Saved has a normal cursor; save updates the existing URL",
  );
  console.log(
    "PASS share-save failure keeps the draft editable and leaves the published version unchanged",
  );

  await openShare("QA 没有照片");
  await gate(true, false);
  const photoPath = fileURLToPath(
    new URL("../public/camera.webp", import.meta.url),
  );
  const upload = await fetch(
    `http://localhost:3456/setFiles?target=${target}`,
    {
      method: "POST",
      body: JSON.stringify({
        selector: "input[type=file]",
        files: [photoPath],
      }),
    },
  );
  assert(upload.ok);
  await until(`window.__qa.waiters.post.length===1`);
  assert(
    await evaluate(
      `${dialog}.innerText.includes('正在保存照片') && !${dialog}.innerText.includes('正在生成链接')`,
    ),
  );
  await release("post");
  await until(`!${dialog}.innerText.includes('正在保存照片')`);
  const photographedItem = await db.item.findUniqueOrThrow({
    where: { id: "interaction-qa-photo" },
  });
  assert(photographedItem.image?.startsWith("data:image/jpeg;base64,"));
  assert.equal(
    await db.itemShare.count({ where: { itemId: photographedItem.id } }),
    0,
    "Photo persistence does not publish an item",
  );
  await closeShare();
  assert(
    await evaluate(
      `${card("QA 没有照片")}.querySelector('img').src.startsWith('data:image/jpeg')`,
    ),
  );
  await openShare("QA 没有照片");
  await until(`${dialog}.querySelector('img')?.naturalWidth===1800`);
  await gate(true, false);
  await click("生成分享链接", dialog);
  await until(`window.__qa.waiters.post.length===1`);
  assert(await evaluate(`${dialog}.innerText.includes('正在生成链接')`));
  await release("post");
  await until(`!!${dialog}.querySelector('input[readonly]')`);
  const published = await db.itemShare.findUniqueOrThrow({
    where: { itemId: photographedItem.id },
  });
  assert.equal(published.image, photographedItem.image);
  console.log(
    "PASS share photo is saved to the item before publishing, survives closing/reopening and is reused by the published card",
  );

  await gate(true, false);
  await click("关闭分享", dialog);
  await until(`window.__qa.waiters.post.length===1`);
  assert(
    await evaluate(
      `${dialog}.innerText.includes('正在关闭分享') && !${dialog}.innerText.includes('正在生成链接')`,
    ),
  );
  await release("post");
  await until(`${dialog}.innerText.includes('旧链接已失效')`);
  assert.equal(
    (await db.item.findUniqueOrThrow({ where: { id: photographedItem.id } }))
      .image,
    photographedItem.image,
  );
  console.log(
    "PASS turning off sharing has its own loading state and preserves the item's photo",
  );
  await closeShare();

  await db.item.update({
    where: { id: photographedItem.id },
    data: { image: null },
  });
  await db.itemShare.create({
    data: { itemId: photographedItem.id, image: photographedItem.image },
  });
  await db.itemShare.update({
    where: { itemId: "interaction-qa-camera" },
    data: { image: "/blazer.webp" },
  });
  const migration = fileURLToPath(
    new URL(
      "../prisma/migrations/20261101010000_sync_shared_item_photos/migration.sql",
      import.meta.url,
    ),
  );
  const migrationResult = spawnSync(
    "npx",
    ["prisma", "db", "execute", "--file", migration, "--url", databaseUrl],
    { cwd: fileURLToPath(new URL("..", import.meta.url)), encoding: "utf8" },
  );
  assert.equal(migrationResult.status, 0, migrationResult.stderr);
  assert.equal(
    (await db.item.findUniqueOrThrow({ where: { id: photographedItem.id } }))
      .image,
    photographedItem.image,
  );
  assert.equal(
    (
      await db.item.findUniqueOrThrow({
        where: { id: "interaction-qa-camera" },
      })
    ).image,
    "/camera.webp",
  );
  console.log(
    "PASS legacy share-only photos are backfilled without overwriting existing item photos",
  );
} finally {
  if (target) {
    try {
      if (originalCookie !== undefined)
        await evaluate(
          `document.cookie=${JSON.stringify(originalCookie ? `${originalCookie}; path=/; SameSite=Lax` : "session=; path=/; max-age=0")};true`,
        );
    } finally {
      await fetch(`http://localhost:3456/close?target=${target}`);
    }
  }
  await db.$disconnect();
}
