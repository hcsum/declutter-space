# 译文英文夹杂清理 — 交接文档

## 任务
把已翻译的 **zh / ja** 内容里夹杂的、不合理的英文单词改成对应中文/日语，让译文自然。
范围：`src/app/[lang]/*/page.tsx` 各页面 `getCopy(locale)` 里的 zh / ja 文案块。
**只改 zh 和 ja 块，绝不动 en 块**（en 块的英文是正确的原文）。

## 进度

### ✅ 已完成（zh + ja 全清干净，含标题 / eyebrow / CTA）
- `how-to-declutter-your-kitchen`
- `how-to-declutter-sentimental-items`
- `how-to-declutter-your-bedroom`
- `how-to-declutter-your-bathroom`
- `how-to-declutter-your-closet`
- `things-to-declutter`
- `how-to-declutter-unwanted-gifts`
- `page.tsx`（首页）

### ✅ 已完成但是 **ja-only**（没有 zh 版，中文 fallback 到英文）
- `decluttering-after-a-death`
- `swedish-death-cleaning`
- `decluttering-before-a-move`

> 这三个的中文缺失属于「未翻译」，不是「夹杂英文」，不在本任务范围。若要补 zh 版是另一件事。

### ⛔ 待做（完全没动）
- `how-to-declutter-your-living-room`
- `how-to-declutter-your-home-office`
- `things-to-stop-buying`
- `adhd-cleaning-checklist`（最多，约 36+ 处）

## 怎么扫出待改的行

对每个文件，先用下面命令找 block 边界：
```bash
grep -nE 'if \(locale ===|^  return \{' "src/app/[lang]/<file>/page.tsx"
```
结构通常是：`if (locale === "zh") { return {...} }` → `if (locale === "ja") { return {...} }` → `return {...}`（en）。
en 块 = 两个 if 之后那个**顶格 2 空格缩进的 `return {`**。

然后**只扫 zh+ja 区间、排除 en 块**，两个方向都要查：
```bash
awk -v s=<zh或ja起始行> -v e=<en起始行减1> 'NR>=s && NR<=e' "src/app/[lang]/<file>/page.tsx" \
 | grep -E ': "[^"]*[A-Za-z]{3,}|"[^"]*[A-Za-z]{3,}[^"]*"' \
 | grep -vE 'DeclutterYourHome|Goodwill|Salvation|Minimalists|Reddit|r/declutter|href|ADHD|DVD|CD|USB|SD|guilt:|action:|pressure:|gentle:'
```

### ⚠️ 易漏 / 误报
- **易漏**：英文出现在 CJK **之前**（`"Bedroom Checklist ページを開く"`）、或**纯英文值**（zh 块里的 `eyebrow: "Bedroom Guide"`、`heroTitle: "How to..."`）。务必用上面正反双向的正则，别只查「CJK 在前」。
- **误报**：`guilt:` / `action:` / `pressure:` 这类是**对象 key（代码标识符）**，不是文案；`className="...text-[#173223]..."` 里的英文也是误报。这些**不要改**。

## 术语表（已沿用，请保持一致）

### 日语（ja）
| 英文 | 日语 |
|---|---|
| clutter | 散らかり |
| declutter | 片付け |
| decision fatigue | 判断疲れ |
| checklist | チェックリスト |
| decision guide | 判断ガイド |
| routine | 習慣 |
| decor | 飾り |
| workflow | 作業の流れ |
| cookware / gadget | 調理器具・調理グッズ |
| toiletries | 洗面用品 |
| cable / charger | ケーブル・充電器 |
| accessories | 小物 |
| device | 機器 |
| FAQ | よくある質問 |
| maybe box | 保留ボックス |
| basics | 定番服 |
| overflow | あふれ／あふれた分 |
| storage | 物置 |
| pantry | 食品庫 |
| skincare / haircare | スキンケア・ヘアケア（片假名 OK）|
| travel-size | トラベルサイズ |
| obvious no | 明らかに不要な物 |
| `〇〇 Checklist`（页面名）| `〇〇チェックリスト` |
| grief / grief work | 悲しみ／グリーフワーク |
| Death cleaning（方法，正文中）| デス・クリーニング |

### 中文（zh）
| 英文 | 中文 |
|---|---|
| clutter | 杂物 |
| declutter | 整理 |
| decision fatigue | 决策疲劳 |
| checklist | 清单 |
| sentimental clutter | 情感杂物 |
| identity | 自我认同 |
| "use it or lose it" | "用，或者放手" |
| maybe box / maybe pile | "待定盒" / "待定堆" |
| one-in-one-out | "一进一出" |
| wishlist | 心愿单 |
| `〇〇 Checklist 功能页` | `〇〇清单功能页` |
| H2 / eyebrow 里的 `（English gloss）` | 直接删掉 |

### 保留不译（两种语言通用）
专有名词：`DeclutterYourHome`、`Reddit`、`r/declutter`、`Goodwill`、`Salvation Army`、`The Minimalists`、`Margareta Magnusson`、书名、`KonMari`、`Swedish Death Cleaning` / `döstädning`（方法名，标题/首次定义处保留）。
占位符：`{count}`、`{date}`、`{percentage}`、`{file}` 等。
标准缩写：`CSV / DVD / CD / SD / USB / SNS / ADHD`。

## 收尾步骤（4 个文件都做完后）
```bash
cd ~/Codes/declutter-zen
# 1. 逐文件按上面方法再扫一遍，确认 zh/ja 块零残留
# 2. typecheck（已知当前通过）
npx tsc --noEmit
# 3. build
npm run build
# 4. commit + push（当前所有清理改动尚未提交）
git add -A && git commit -m "i18n: 清理 zh/ja 文案中夹杂的英文"
git push origin main
```

## 已知的相关历史改动
- i18n JSON（`src/i18n/zh.json` / `ja.json`）此前已清理，`zh.json` 的 `flow: "Flow"` 已改为 `心流`。
- checklist 条目数据（`src/const/declutter-checklist.{zh,ja}.json`）已检查，里面的 `T恤/Tシャツ`、`DVD/CD`、`SNS` 是标准写法，保留。
