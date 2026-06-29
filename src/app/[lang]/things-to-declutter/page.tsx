import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

type Category = {
  heading: string;
  items: string[];
};

type Copy = {
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introBody: string;
  howToUseTitle: string;
  howToUseBody: string;
  categoriesTitle: string;
  categories: Category[];
  seasonalTitle: string;
  movingHeading: string;
  movingItems: string[];
  newYearHeading: string;
  newYearItems: string[];
  faqTitle: string;
  faqs: Array<[string, string]>;
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: Array<{ href: string; label: string }>;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

function getCopy(locale: string): Copy {
  if (locale === "ja") {
    return {
      title: "家の断捨離で手放せるもの60選【部屋別リスト】| DeclutterYourHome",
      description:
        "キッチン、寝室、浴室、リビング、クローゼット、ホームオフィス別にまとめた、家の断捨離で手放せるもの60選。迷いにくい物から始めて、今日すぐ片付けを前に進めましょう。",
      eyebrow: "断捨離リスト",
      heroTitle: "家の断捨離で手放せるもの60選【部屋別】",
      heroSubtitle:
        "何から片付ければいいかわからないときは、考え方より先にリストで進めましょう。どの家にもありがちだけれど、実はもう必要ない物を60個まとめました。1つずつ短く判断できるので、手放せるものから今すぐ減らせます。",
      introTitle: "このリストの使い方",
      introBody:
        "断捨離で一番消耗するのは体力ではなく、決断の連続です。物を1つ持つたびに判断が必要になるからです。このリストは、その判断の大半を先に済ませてくれます。ここにある物の多くは、ほとんどの人にとってそのまま手放していいものです。まず全体を見て、各部屋で3〜5個の即決できる物を先に外してください。迷う物は次の周回へ回せば十分です。初回の目的は勢いを作ることです。",
      howToUseTitle: "小さなリマインド",
      howToUseBody:
        "60個すべてを一度に手放す必要はありません。30分で15〜20個減らせたら、それだけで十分に成功です。" +
        ' "60" は達成義務のあるチェックリストではなく、選べるメニューだと考えてください。',
      categoriesTitle: "部屋別に見る、手放せるもの60選",
      categories: [
        {
          heading: "キッチン（断捨離しやすいもの10個）",
          items: [
            "1. 賞味期限切れ、または香りが飛んだスパイスや乾燥ハーブ（目安は2年以上）",
            "2. 重複しているキッチン小物: 2本目のピーラー、缶切り、余分な計量カップ",
            "3. 本体とフタがそろわない保存容器",
            "4. もらったけれど結局使っていないマグカップ",
            "5. 年に3回も使わない専用家電（アボカドスライサー、ジューサー、ホームベーカリーなど）",
            "6. もう見ない宅配メニューや印刷したレシピ",
            "7. シミ、ゆがみ、深い傷があるプラスチック製まな板",
            "8. 戸棚の奥でほこりをかぶっている水筒やタンブラー",
            "9. 開封から1年以上たった食品: 湿気たシリアル、古いパスタ、酸化したナッツ",
            "10. ノンスティック加工がはがれた調理器具やフタのない鍋",
          ],
        },
        {
          heading: "寝室（断捨離しやすいもの10個）",
          items: [
            "1. へたって首が痛くなる古い枕",
            "2. ケーブルが傷んだ古い充電器やイヤホン",
            "3. ベッドサイドに置いたまま1年開いていない本",
            '4. "あの椅子" に掛かったままで、もう着ていない服',
            "5. ドレッサーの上でほこりをかぶっている飾り物",
            "6. 以前のインテリアの名残で余っているクッション",
            "7. ベッド下にしまい込んだホテルのアメニティや古い寝具",
            "8. ナイトテーブルの引き出しにたまった名刺、レシート、紙類",
            "9. ほとんど空なのに存在を忘れていた香水やコロン",
            "10. クリーニング店でもらった針金ハンガー",
          ],
        },
        {
          heading: "浴室（断捨離しやすいもの10個）",
          items: [
            "1. 使用期限が切れた化粧品、日焼け止め、スキンケア用品",
            "2. 底に少しだけ残ったシャンプーやコンディショナーのボトル",
            "3. 何年も前の旅行で持ち帰ったトラベルサイズの洗面用品",
            "4. 伸びたヘアゴムや壊れたヘアクリップ",
            "5. 期限切れの処方薬や風邪薬",
            "6. 色あせて薄くなったバスタオルやハンドタオル",
            "7. おまけでもらったものの、実際には使わない試供品",
            "8. 切れ味が落ちた、またはさびたカミソリ",
            "9. ほつれたボディスポンジや硬くなったバススポンジ",
            "10. 使用期限が切れた救急用品: 古い絆創膏、乾いた軟膏、長年置いたコットン",
          ],
        },
        {
          heading: "リビング（断捨離しやすいもの10個）",
          items: [
            "1. もう持っていない機器のリモコン",
            "2. 何年も再生していないDVD、CD、ゲームディスク",
            "3. 2か月以上前の雑誌、カタログ、新聞",
            "4. 実は自分では好きではない花瓶や飾り物",
            "5. ファスナーが壊れた、またはカバーが汚れたクッション",
            "6. 絡まったケーブル、切れた電池、使わない充電器",
            "7. 部屋の色味にもう合わないコースター",
            "8. 子どもがもう遊ばないのに部屋に散らばっているおもちゃ",
            "9. コーヒーテーブルにあるのに一度も開かない写真集や大型本",
            "10. 伸びたブランケット、肌ざわりの悪い毛布、同じ用途の重複品",
          ],
        },
        {
          heading: "クローゼット（断捨離しやすいもの10個）",
          items: [
            "1. 1年以上サイズが合っていない服",
            "2. 相方が見つからない片方だけの靴下",
            "3. ゴムが伸びた服、壊れたファスナー、ほつれた縫い目のある服",
            "4. はくたびに足が痛くなる靴",
            "5. 今持っているパンツに合わないベルト",
            "6. もう行かないイベントのTシャツ",
            "7. 辞めた仕事や業界で着ていた古い仕事服",
            "8. 空の靴箱や買い物時のパッケージ",
            "9. そろっていないクリーニングハンガー",
            "10. 3年以上着ていないフォーマル服や特別な日の服",
          ],
        },
        {
          heading: "ホームオフィス（断捨離しやすいもの10個）",
          items: [
            "1. インクが出ないペンや短くなりすぎた鉛筆",
            "2. もう持っていない機器の取扱説明書や保証書",
            "3. 税務保存期間を過ぎた請求書、レシート、明細",
            "4. もう使わない古い参考書や教科書",
            "5. とっくに買い替えた機器のケーブル",
            "6. ラベルのないUSBメモリ、空のCD、SDカード",
            "7. 過去年のノート、手帳、カレンダー",
            "8. カンファレンスでもらったノベルティ、無料メモ帳、企業ロゴ入りペン",
            "9. もう持っていないプリンター用のインクカートリッジ",
            "10. 使い切れない量の付箋、クリップ、テープ",
          ],
        },
      ],
      seasonalTitle: "タイミング別の追加リスト",
      movingHeading: "引っ越し前に手放したいもの",
      movingItems: [
        "この1年使っていないキッチン用品。運ぶだけで負担になります",
        "新居でももう買い直さない重い家具やパーツ",
        "今の生活リズムに合っていないスポーツ用品や運動器具",
        ' "いつか読むかも" で残している本',
        "引っ越し前からすでに卒業していた子どものおもちゃ",
      ],
      newYearHeading: "新年を迎える前に手放したいもの",
      newYearItems: [
        "終わる年の古いカレンダー、手帳、ステッカー",
        "ホリデーシーズンにもらったけれど使わないギフト",
        ' "今年こそ学ぶ / 終わらせる" 計画にひもづいていたが、もう現実的でない物',
        "過去12か月で一度も手に取らなかったキッチンツール",
        "この1年で1回着たか、それ以下の服",
      ],
      faqTitle: "よくある質問",
      faqs: [
        ["60個を片付けるのにどれくらいかかりますか？", "明らかに不要なものだけなら、1部屋10〜20分が目安で、全体でも1〜2時間ほどで終えられます。ただし実際には、1回で全部やるより、1〜2部屋ずつを2〜3回に分ける方が続けやすく、判断疲れで本当は手放せる物を残してしまうのも防げます。"],
        ["迷う物はどうすればいいですか？", "無理に決めないでください。『保留ボックス』を1つ用意し、日付を書いて封をして見えない場所に置きます。60〜90日たっても一度も開けなかったなら、中身を見直さず箱ごと手放して大丈夫です。"],
        ["寄付やリサイクルはどこに持っていけばいいですか？", "期限切れの化粧品や薬は、一般ごみではなく薬局の回収や自治体の有害ごみルートを使ってください。状態のよい衣類、キッチン用品、おもちゃはリサイクルショップや地域の寄付先へ。電子機器のケーブルや電池は家電回収・小型家電リサイクルへ持ち込み、通常の資源ごみに混ぜないようにしましょう。"],
      ],
      relatedTitle: "関連ガイド",
      relatedIntro: "部屋ごとにもっと詳しく進めたい場合は、こちらのガイドをどうぞ。",
      relatedLinks: [
        { href: "/how-to-declutter-your-kitchen", label: "キッチンの断捨離方法" },
        { href: "/how-to-declutter-your-bedroom", label: "寝室の断捨離方法" },
        { href: "/how-to-declutter-your-bathroom", label: "浴室の断捨離方法" },
        { href: "/how-to-declutter-your-living-room", label: "リビングの断捨離方法" },
        { href: "/how-to-declutter-your-closet", label: "クローゼットの断捨離方法" },
        { href: "/how-to-declutter-your-home-office", label: "ホームオフィスの断捨離方法" },
        { href: "/decluttering-before-a-move", label: "引っ越し前の断捨離ガイド" },
        { href: "/declutter-checklist", label: "断捨離チェックリスト" },
        { href: "/decluttering-decision-guide", label: "迷う物の判断ガイド" },
      ],
      ctaTitle: "このリストを進捗管理できるチェックリストに",
      ctaBody:
        "インタラクティブな断捨離チェックリストで、部屋ごとに項目をチェックできます。進捗は自動保存されるので、途中で止めても続きから再開できます。",
      ctaButton: "断捨離チェックリストを開く",
    };
  }

  if (locale === "zh") {
    return {
      title: "60 件可以从家里清掉的东西 | 房间分类清单 | DeclutterYourHome",
      description:
        "按房间整理的 60 件常见可清理物品清单：厨房、卧室、浴室、客厅、衣柜、家庭办公。从最容易决定的开始，让整理立刻有进展。",
      eyebrow: "断舍离清单",
      heroTitle: "60 件可以从家里清掉的东西（按房间分组）",
      heroSubtitle:
        "如果不知道从哪里开始整理，先不要想原则。直接照清单走：60 件大部分人家里都有、但其实不用再留的东西。每件只用一两句话判断，能立刻清就立刻清。",
      introTitle: "这份清单怎么用",
      introBody:
        "整理最大的阻力不是体力，是决策疲劳：每拿起一件就要想一次。这份清单替你把大部分判断做完了——上面写出来的，绝大多数人都可以直接放手。先扫一遍，每个房间挑 3-5 件马上能决定的，先丢出来。剩下犹豫的留到下一轮，不要卡在第一轮。",
      howToUseTitle: "一个小提醒",
      howToUseBody:
        "清单的目的不是逼你 60 件全清。如果你能在 30 分钟内清掉 15-20 件，已经是非常成功的一次整理。把 \"60\" 当作一个上限菜单，不是必须完成的清单。",
      categoriesTitle: "按房间分类的 60 件物品",
      categories: [
        {
          heading: "厨房（10 件）",
          items: [
            "1. 已过期或风味全失的香料、调味料（一般超过 2 年）",
            "2. 重复的小工具：多余的削皮器、开瓶器、量杯",
            "3. 配不成套的保鲜盒和盖子",
            "4. 收到但你从来不用来喝东西的赠品杯",
            "5. 一年用不到 3 次的专用小电器（鳄梨切片器、榨汁机、面包机）",
            "6. 旧外卖单和早就不会用的食谱打印件",
            "7. 染色、变形、刀痕严重的塑料砧板",
            "8. 柜子深处积灰的塑料水瓶和保温杯",
            "9. 开封超过一年的意面、麦片、坚果",
            "10. 不粘涂层脱落或盖子丢失的锅具",
          ],
        },
        {
          heading: "卧室（10 件）",
          items: [
            "1. 已经压塌、睡着脖子疼的旧枕头",
            "2. 接触不良、线材磨损的旧充电器和耳机",
            "3. 床头柜上放了一年都没翻开的书",
            "4. 一直挂在 \"那把椅子\" 上、其实不会再穿的衣服",
            "5. 梳妆台上积灰的装饰摆件",
            "6. 换过家具风格之后多出来的旧抱枕",
            "7. 床底压着的酒店赠品床品和纪念物",
            "8. 床头柜抽屉里的名片、收据、零散纸张",
            "9. 几乎用完、自己都忘了存在的香水试用装",
            "10. 干洗店带回来后再没去过的金属衣架",
          ],
        },
        {
          heading: "浴室（10 件）",
          items: [
            "1. 已过期的化妆品、防晒霜、护肤品",
            "2. 用完只剩一指深的洗发水、护发素瓶",
            "3. 从过去几次旅行带回来、放了好几年的旅行装",
            "4. 松了的发圈和断了的发夹",
            "5. 已过期的处方药、感冒药",
            "6. 褪色、起毛、再洗也回不来的浴巾、毛巾",
            "7. 收回来但你知道根本不会用的试用小样",
            "8. 钝了刮不干净的剃须刀",
            "9. 起球、变硬的浴擦、丝瓜瓤",
            "10. 急救包里过期的创可贴、药膏、棉球",
          ],
        },
        {
          heading: "客厅（10 件）",
          items: [
            "1. 已经卖掉的电器的遥控器",
            "2. 多年没看过的 DVD、CD、游戏光盘",
            "3. 超过 2 个月的杂志、目录、报纸",
            "4. 你自己都不喜欢的装饰花瓶和摆件",
            "5. 拉链坏掉、套子染色的旧抱枕",
            "6. 缠成一团的线缆、没电的电池、淘汰的充电头",
            "7. 颜色已经不搭新装修的杯垫",
            "8. 孩子长大不再玩、但还散落在客厅的玩具",
            "9. 摆在咖啡桌上但你从来不翻的咖啡桌书",
            "10. 起球、刮人或者跟现有同款重复的盖毯",
          ],
        },
        {
          heading: "衣柜（10 件）",
          items: [
            "1. 超过一年都不合身的衣服",
            "2. 找不到另一半的单只袜子",
            "3. 弹力松掉、拉链坏掉、线头脱落的旧衣",
            "4. 每次穿都磨脚或夹脚的鞋",
            "5. 配不上你目前任何裤子的腰带",
            "6. 已经不再去那个场合的活动 T 恤",
            "7. 上一段职业生涯穿的工作服",
            "8. 留着的空鞋盒和购物包装",
            "9. 来自干洗店的不配套衣架",
            "10. 三年以上没穿过的特殊场合服装",
          ],
        },
        {
          heading: "家庭办公（10 件）",
          items: [
            "1. 干涸的笔和写到很短的铅笔",
            "2. 早就不用的设备的说明书和保修卡",
            "3. 超过税务保留期限的账单、收据、对账单",
            "4. 已过时、不再用得到的参考书和教科书",
            "5. 已替换或淘汰的设备的旧线缆",
            "6. 散落各处、没贴标签的 U 盘和 SD 卡",
            "7. 去年甚至更早的笔记本、日程本",
            "8. 会议赠送的本子、品牌笔、随手赠品",
            "9. 已经不用那台打印机的墨盒",
            "10. 永远用不完的便利贴、回形针、胶带卷",
          ],
        },
      ],
      seasonalTitle: "按时机分类的额外清单",
      movingHeading: "搬家前可以清掉的东西",
      movingItems: [
        "11 个月以上没用过的厨房用品",
        "搬不动也不打算继续用的家具配件",
        "不再用的运动器材和健身道具",
        "已经不读的书、留着只是因为 \"也许哪天\"",
        "孩子早就长大不玩的旧玩具",
      ],
      newYearHeading: "新年前可以清掉的东西",
      newYearItems: [
        "今年的旧日历、规划本、贴纸",
        "节日礼物里收到但用不上的小物",
        "已经不可能完成的 \"今年要学/做完\" 的物品",
        "过去一年都没用过的厨房工具",
        "去年穿过一次以下的衣服",
      ],
      faqTitle: "常见问题",
      faqs: [
        ["完成这份清单大概要多久？", "如果只清明确可以扔的，每个房间 10-20 分钟，全部 60 件 1-2 小时内能完成。但更现实的做法是分两三次，每次做 1-2 个房间，避免决策疲劳让你后半段开始留下不该留的东西。"],
        ["拿不准的东西怎么办？", "拿不准的不要硬决定。可以放进一个 \"待定盒\"——装进去，写下日期，封起来收到看不见的地方。如果 60-90 天内你没有打开找过任何东西，就可以整箱处理掉。"],
        ["这些东西去哪里捐？哪里回收？", "化妆品和药品要按当地药房或市政有害垃圾流程处理，不要直接扔生活垃圾。完好的衣物、厨具、玩具可以去 Goodwill、Salvation Army 或本地慈善店。电子线缆和电池找回收站，不要混入普通回收桶。"],
      ],
      relatedTitle: "相关阅读",
      relatedIntro: "想要按房间深入操作，去看对应的房间指南：",
      relatedLinks: [
        { href: "/how-to-declutter-your-kitchen", label: "如何整理厨房" },
        { href: "/how-to-declutter-your-bedroom", label: "如何整理卧室" },
        { href: "/how-to-declutter-your-bathroom", label: "如何整理浴室" },
        { href: "/how-to-declutter-your-living-room", label: "如何整理客厅" },
        { href: "/how-to-declutter-your-closet", label: "如何整理衣柜" },
        { href: "/how-to-declutter-your-home-office", label: "如何整理家庭办公" },
        { href: "/declutter-checklist", label: "互动整理清单" },
        { href: "/decluttering-decision-guide", label: "犹豫物品决策指南" },
      ],
      ctaTitle: "把这份清单变成可勾选的进度",
      ctaBody: "在互动整理清单里逐项勾选，进度自动保存，可按房间筛选。",
      ctaButton: "打开互动整理清单",
    };
  }

  return {
    title: "60 Things to Declutter from Your Home (Room-by-Room List) | DeclutterYourHome",
    description:
      "A practical room-by-room list of 60 things to declutter from your home — kitchen, bedroom, bathroom, living room, closet, and home office. Start with the easy ones today.",
    eyebrow: "Declutter List",
    heroTitle: "60 Things to Declutter from Your Home (Room-by-Room List)",
    heroSubtitle:
      "When you do not know where to start, skip the philosophy and just work the list. These are 60 things almost every home holds onto but does not actually need. Each one takes a sentence to judge — if it sounds like yours, let it go.",
    introTitle: "How to use this list",
    introBody:
      "The hardest part of decluttering is not the lifting, it is the decision fatigue — each item asks you to choose. This list does most of the choosing for you. Almost every item on it can go for most people. Read through, pick three to five quick wins per room, and remove those first. Leave the maybes for a second pass; the goal of round one is momentum.",
    howToUseTitle: "One small reminder",
    howToUseBody:
      "You are not supposed to clear all 60. If you remove 15 to 20 things in half an hour, that is already a strong session. Treat the 60 as a menu, not a checklist you owe.",
    categoriesTitle: "The 60 things, grouped by room",
    categories: [
      {
        heading: "Kitchen (10 things to declutter)",
        items: [
          "1. Expired spices and dried herbs that have lost their smell (usually anything over two years old)",
          "2. Duplicate gadgets: a second peeler, can opener, or extra measuring cups",
          "3. Mismatched food storage container lids and bases",
          "4. Gift mugs you never actually drink from",
          "5. Specialty appliances used fewer than three times a year (avocado slicer, juicer, bread maker)",
          "6. Take-out menus and printed recipes you no longer follow",
          "7. Stained, warped, or scarred plastic cutting boards",
          "8. Reusable water bottles and travel mugs collecting dust in the back of a cabinet",
          "9. Opened pantry items past a year: stale cereal, old pasta, oxidized nuts",
          "10. Cookware with flaking non-stick coating or missing lids",
        ],
      },
      {
        heading: "Bedroom (10 things to declutter)",
        items: [
          "1. Worn-out pillows that hurt your neck",
          "2. Old phone chargers and earbuds with frayed cables",
          "3. Books on the nightstand you have not opened in a year",
          "4. Clothes draped on \"the chair\" that you no longer wear",
          "5. Decorative items collecting dust on the dresser",
          "6. Extra throw pillows left over from a previous decor style",
          "7. Hotel souvenirs and old bedding under the bed",
          "8. Loose business cards, receipts, and stray paper in the nightstand drawer",
          "9. Almost-empty perfumes and colognes you forgot about",
          "10. Wire hangers from past dry-cleaning runs",
        ],
      },
      {
        heading: "Bathroom (10 things to declutter)",
        items: [
          "1. Expired makeup, sunscreen, and skincare",
          "2. Shampoo and conditioner bottles down to the last inch",
          "3. Travel-size toiletries from trips years ago",
          "4. Stretched-out hair ties and broken hair clips",
          "5. Expired prescription medications and cold medicine",
          "6. Faded, threadbare bath and hand towels",
          "7. Free-with-purchase samples you will not actually use",
          "8. Razors with dull or rusted blades",
          "9. Frayed loofahs and hardened bath sponges",
          "10. Expired first-aid items: old bandages, dried-out ointments, ancient cotton balls",
        ],
      },
      {
        heading: "Living Room (10 things to declutter)",
        items: [
          "1. Remotes for devices you no longer own",
          "2. DVDs, CDs, and gaming discs you have not played in years",
          "3. Magazines, catalogs, and newspapers older than two months",
          "4. Vases and decor pieces you do not actually like",
          "5. Throw pillows with broken zippers or stained covers",
          "6. Tangled cables, dead batteries, and obsolete chargers",
          "7. Coasters in colors that no longer match the room",
          "8. Kids' toys outgrown but still scattered in the room",
          "9. Coffee table books you never open",
          "10. Stretched-out throws, scratchy blankets, or duplicates of the same throw",
        ],
      },
      {
        heading: "Closet (10 things to declutter)",
        items: [
          "1. Clothes that have not fit for over a year",
          "2. Single socks still waiting for a missing partner",
          "3. Stretched-out elastics, broken zippers, and unraveling seams",
          "4. Shoes that hurt your feet every time you wear them",
          "5. Belts that no longer fit any of your current pants",
          "6. Event t-shirts from places you no longer go",
          "7. Old work clothes from a job or industry you have left",
          "8. Empty shoeboxes and original packaging from past purchases",
          "9. Mismatched dry-cleaning hangers crowding the rod",
          "10. Special-occasion outfits unworn for three or more years",
        ],
      },
      {
        heading: "Home Office (10 things to declutter)",
        items: [
          "1. Dried-out pens and pencils worn down to stubs",
          "2. User manuals and warranty cards for devices you no longer own",
          "3. Paid bills, receipts, and statements past the tax-keep window",
          "4. Outdated reference books and textbooks you no longer use",
          "5. Cables for devices long replaced or thrown out",
          "6. Random USB drives, blank CDs, and unlabeled SD cards",
          "7. Notebooks, planners, and calendars from previous years",
          "8. Conference swag, free notepads, and branded pens",
          "9. Printer cartridges for a printer you no longer own",
          "10. Sticky notes, paper clips, and tape rolls in quantities you will never finish",
        ],
      },
    ],
    seasonalTitle: "Extra lists by timing",
    movingHeading: "Things to declutter before moving",
    movingItems: [
      "Kitchen items untouched in the past year — moving them is paying to move dead weight",
      "Heavy furniture pieces you would not buy again at the new place",
      "Sports gear and exercise equipment that no longer fits your routine",
      "Books you no longer read but keep \"just in case\"",
      "Kids' toys outgrown well before the move",
    ],
    newYearHeading: "Things to declutter before the new year",
    newYearItems: [
      "Old calendars, planners, and sticker sheets from the year ending",
      "Holiday gifts you received but will not use",
      "Items from a \"this year I'll learn / finish\" plan that is no longer realistic",
      "Kitchen tools you did not reach for once in the past twelve months",
      "Clothes you wore once or never in the past year",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      ["How long does it take to declutter 60 things?", "If you only clear the obvious noes, 10 to 20 minutes per room is realistic — about one to two hours for the whole list. A more sustainable pace is two or three sittings, one or two rooms each, so decision fatigue does not lead you to keep things you should have let go."],
      ["What should I do with items I am unsure about?", "Do not force a decision. Put them into a \"maybe box\" — write today's date on the outside, seal it, and put it out of sight. If you have not opened the box in sixty to ninety days, you can let the whole box go without reopening it."],
      ["Where should I donate or recycle these items?", "Expired makeup and medications belong at a pharmacy take-back program or your municipal hazardous-waste site, not regular trash. Good-condition clothing, kitchenware, and toys can go to Goodwill, the Salvation Army, or local charity shops. Electronics and batteries need an e-waste drop-off; do not mix them into regular recycling."],
    ],
    relatedTitle: "Related guides",
    relatedIntro: "Want to go deeper on a specific room? These guides take you step by step:",
    relatedLinks: [
      { href: "/how-to-declutter-your-kitchen", label: "How to declutter your kitchen" },
      { href: "/how-to-declutter-your-bedroom", label: "How to declutter your bedroom" },
      { href: "/how-to-declutter-your-bathroom", label: "How to declutter your bathroom" },
      { href: "/how-to-declutter-your-living-room", label: "How to declutter your living room" },
      { href: "/how-to-declutter-your-closet", label: "How to declutter your closet" },
      { href: "/how-to-declutter-your-home-office", label: "How to declutter your home office" },
      { href: "/decluttering-before-a-move", label: "Decluttering before a move (downsizing)" },
      { href: "/declutter-checklist", label: "Interactive declutter checklist" },
      { href: "/decluttering-decision-guide", label: "Decision guide for hard items" },
    ],
    ctaTitle: "Turn this list into a trackable checklist",
    ctaBody:
      "Use the interactive declutter checklist to tick items off room by room. Progress saves automatically so you can come back tomorrow and pick up where you left off.",
    ctaButton: "Open the interactive declutter checklist",
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/things-to-declutter"),
  };
}

export default async function ThingsToDeclutterPage({ params }: Props) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return (
    <main className="min-h-screen bg-[#f3f4ec] px-5 pb-20 pt-24 text-[#1a1c18] md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 md:px-10 md:py-14">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#59615d]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-[-0.05em] text-[#002d1c] md:text-6xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#414844] md:text-lg md:leading-8">
            {copy.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <Link
              href={`/${locale}/declutter-checklist`}
              className="rounded-full bg-[#002d1c] px-5 py-3 text-white"
            >
              {copy.ctaButton}
            </Link>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.introTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#414844]">{copy.introBody}</p>
          </article>

          <aside className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
              {copy.howToUseTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#335748]">{copy.howToUseBody}</p>
          </aside>
        </section>

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.categoriesTitle}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {copy.categories.map((cat) => (
              <div key={cat.heading} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5">
                <h3 className="text-lg font-bold text-[#002d1c]">{cat.heading}</h3>
                <ol className="mt-3 space-y-2 text-sm leading-6 text-[#414844] md:text-base md:leading-7">
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#573611] md:text-3xl">
            {copy.seasonalTitle}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/70 px-5 py-5">
              <h3 className="text-lg font-bold text-[#573611]">{copy.movingHeading}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#7a5228] md:text-base">
                {copy.movingItems.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.5rem] bg-white/70 px-5 py-5">
              <h3 className="text-lg font-bold text-[#573611]">{copy.newYearHeading}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#7a5228] md:text-base">
                {copy.newYearItems.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.faqTitle}
          </h2>
          <div className="mt-6 space-y-4">
            {copy.faqs.map(([question, answer]) => (
              <div key={question} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5">
                <h3 className="text-lg font-bold text-[#002d1c]">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-[#414844] md:text-base md:leading-7">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.relatedTitle}
          </h2>
          <p className="mt-3 text-base leading-7 text-[#335748]">{copy.relatedIntro}</p>
          <ul className="mt-5 grid gap-3 text-sm font-semibold md:grid-cols-2 md:text-base">
            {copy.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="block rounded-2xl bg-white/80 px-4 py-3 text-[#002d1c] hover:bg-white"
                >
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[2rem] bg-[#002d1c] px-6 py-10 text-white md:px-10">
          <h2 className="text-2xl font-bold tracking-[-0.04em] md:text-3xl">{copy.ctaTitle}</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
            {copy.ctaBody}
          </p>
          <div className="mt-6">
            <Link
              href={`/${locale}/declutter-checklist`}
              className="inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#002d1c]"
            >
              {copy.ctaButton}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
