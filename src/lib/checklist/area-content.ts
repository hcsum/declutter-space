import type { Locale } from "@/i18n/config";

type AreaCopy = {
  metaDescription: string;
  intro: string;
  resetDescription: string;
};

type AreaContentBySlug = Record<string, Record<Locale, AreaCopy>>;

/**
 * Per-category, per-locale copy for /declutter-checklist/[slug]. Each entry
 * references what actually lives in that category's item list instead of a
 * name-substituted template, so the 11 area pages read as distinct content
 * rather than the same paragraph with the noun swapped.
 */
export const areaContent: AreaContentBySlug = {
  "entrance-hall": {
    en: {
      metaDescription:
        "Free entrance hall declutter checklist covering worn-out shoes, expired shoe polish, stray keys, and catch-all baskets that quietly pile up by the door.",
      intro:
        "The entryway fills up fast because everything that hasn't found a home yet gets dropped here first. This checklist targets shoes you no longer wear, umbrellas past saving, and the keychains and baskets that turn into a catch-all pile.",
      resetDescription:
        "Clear the floor and the shoe rack first. A door you can walk through without stepping over anything sets the tone for the rest of the house.",
    },
    zh: {
      metaDescription:
        "免费玄关断舍离清单，涵盖不穿的鞋子、过期鞋油、来路不明的钥匙，以及在门口悄悄堆积成灾的杂物篮。",
      intro:
        "玄关容易变乱，是因为所有还没找到归宿的东西都会先被扔在这里。这份清单专门针对不穿的鞋、修不好的雨伞，以及那些渐渐变成杂物筐的钥匙串和收纳篮。",
      resetDescription:
        "先清空地面和鞋柜。一个不用跨过杂物就能走进门的玄关，会让整个家的整理更容易延续下去。",
    },
    ja: {
      metaDescription:
        "履かなくなった靴、期限切れの靴クリーム、用途不明の鍵、玄関にたまりがちな雑多カゴまでカバーする無料の玄関片付けチェックリスト。",
      intro:
        "玄関は行き場のない物がまず置かれる場所なので、すぐに散らかります。このチェックリストは履いていない靴、直しても仕方のない傘、雑多カゴ化したキーホルダー類に焦点を当てています。",
      resetDescription:
        "まず床とシューズラックから片付けましょう。何もまたがずに歩ける玄関は、家全体の片付けを続けやすくします。",
    },
    es: {
      metaDescription:
        "Lista gratuita para ordenar el recibidor: zapatos que ya no usas, betún caducado, llaves sueltas y las cestas «para todo» que acaban acumulando de todo.",
      intro:
        "El recibidor se llena rápido porque todo lo que aún no tiene sitio se deja aquí primero. Esta lista se centra en los zapatos que ya no te pones, los paraguas sin arreglo y los llaveros y cestas que acaban convertidos en un montón de cosas sueltas.",
      resetDescription:
        "Despeja primero el suelo y el zapatero. Poder entrar en casa sin esquivar nada marca el tono para el resto de la vivienda.",
    },
  },
  bedroom: {
    en: {
      metaDescription:
        "Free bedroom declutter checklist for pillows, nightstand clutter, ill-fitting clothes, and sentimental pieces you keep out of guilt.",
      intro:
        "Your bedroom should help you sleep, not remind you of decisions you haven't made. This checklist works through the nightstand, closet, and drawers, from clothes that no longer fit to pillows past their useful life.",
      resetDescription:
        "Start with the nightstand and the drawer you avoid opening. A bedroom that's easy to reset each morning stays easier to keep that way.",
    },
    zh: {
      metaDescription:
        "免费卧室断舍离清单，涵盖枕头、床头柜杂物、不合身的衣物，以及那些出于愧疚一直留着的纪念品。",
      intro:
        "卧室应该帮你更好地睡觉，而不是提醒你还没做的决定。这份清单会带你处理床头柜、衣柜和抽屉，从不再合身的衣服到早该换掉的枕头。",
      resetDescription:
        "先从床头柜和那个你总是不想打开的抽屉开始。一个每天早上都容易恢复整洁的卧室，才更容易一直保持下去。",
    },
    ja: {
      metaDescription:
        "枕、ナイトテーブルの散らかり、サイズの合わない服、罪悪感で残している思い出の品まで対応する無料の寝室片付けチェックリスト。",
      intro:
        "寝室は決めきれていないことを思い出させる場所ではなく、よく眠るための空間であるべきです。このチェックリストはナイトテーブル、クローゼット、引き出しを順番に片付け、サイズの合わなくなった服や寿命を迎えた枕まで扱います。",
      resetDescription:
        "まずナイトテーブルと、開けるのを避けている引き出しから始めましょう。毎朝リセットしやすい寝室は、そのまま片付いた状態を保ちやすくなります。",
    },
    es: {
      metaDescription:
        "Lista gratuita para ordenar el dormitorio: almohadas gastadas, lo que se acumula en la mesilla, ropa que ya no te vale y cosas que guardas por culpa.",
      intro:
        "El dormitorio debería ayudarte a dormir, no recordarte decisiones que no has tomado. Esta lista recorre la mesilla, el armario y los cajones, desde la ropa que ya no te vale hasta las almohadas que llevan demasiado tiempo en uso.",
      resetDescription:
        "Empieza por la mesilla y por el cajón que evitas abrir. Un dormitorio fácil de recoger cada mañana es un dormitorio que se mantiene.",
    },
  },
  kitchen: {
    en: {
      metaDescription:
        "Free kitchen declutter checklist for chipped tableware, expired seasonings, broken appliances, and duplicate gadgets crowding your drawers.",
      intro:
        "Kitchens accumulate duplicates faster than any other room, one extra spatula and free mug at a time. This checklist covers chipped dishes, expired pantry items, and appliances that stopped earning counter space.",
      resetDescription:
        "Pick one drawer or shelf, not the whole kitchen. Clearing the junk drawer first makes cooking feel less like an obstacle course.",
    },
    zh: {
      metaDescription:
        "免费厨房断舍离清单，涵盖有缺口的餐具、过期调料、坏掉的小家电，以及挤满抽屉的重复厨具。",
      intro:
        "厨房比其他任何房间都更容易堆积重复物品，一个多余的锅铲、一个赠品杯子，慢慢就攒满了。这份清单会处理有缺口的餐具、过期的调味料，以及早就不该再占台面的小家电。",
      resetDescription:
        "先挑一个抽屉或一层架子，不用整间厨房一起来。先清空杂物抽屉，做饭时就不会处处碍手碍脚。",
    },
    ja: {
      metaDescription:
        "欠けた食器、期限切れの調味料、壊れた家電、引き出しを圧迫する重複した調理器具まで扱う無料のキッチン片付けチェックリスト。",
      intro:
        "キッチンは他のどの部屋よりも重複品がたまりやすい場所です。おまけのカトラリーや無料でもらったマグカップが少しずつ積み重なっていきます。このチェックリストは欠けた食器、期限切れの調味料、もう場所に見合わない家電を扱います。",
      resetDescription:
        "キッチン全体ではなく、まず引き出し一つか棚一段だけ選びましょう。ガラクタ引き出しから片付けると、料理がしやすくなります。",
    },
    es: {
      metaDescription:
        "Lista gratuita para ordenar la cocina: vajilla desportillada, especias caducadas, electrodomésticos rotos y utensilios repetidos que llenan los cajones.",
      intro:
        "La cocina acumula duplicados más rápido que cualquier otra habitación, una espátula de más y una taza regalada cada vez. Esta lista cubre la vajilla desportillada, lo caducado de la despensa y los aparatos que dejaron de merecer sitio en la encimera.",
      resetDescription:
        "Elige un cajón o una balda, no la cocina entera. Vaciar el cajón «de todo un poco» hace que cocinar deje de ser una carrera de obstáculos.",
    },
  },
  "living-room": {
    en: {
      metaDescription:
        "Free living room declutter checklist for broken decor, media clutter, expired medicine, and the surfaces that collect everything else.",
      intro:
        "The living room is where clutter from every other room ends up on display. This checklist targets broken decor, souvenirs collecting dust, expired items in the shared medicine drawer, and flyers nobody meant to keep.",
      resetDescription:
        "Clear one surface, such as the coffee table or a shelf, before touching storage. A visibly clearer living room makes the rest of the space easier to tackle.",
    },
    zh: {
      metaDescription:
        "免费客厅断舍离清单，涵盖破损的装饰品、媒体杂物、过期药品，以及那些什么都往上堆的台面。",
      intro:
        "客厅是其他房间的杂物最终展示出来的地方。这份清单专门处理破损的装饰品、积灰的纪念品、公共药箱里过期的药，以及没人真心想留的传单。",
      resetDescription:
        "先清空一个台面，比如茶几或一层架子，再动收纳空间。看得见的整洁感会让接下来的整理更容易推进。",
    },
    ja: {
      metaDescription:
        "壊れた装飾品、メディア周りの散らかり、期限切れの薬、何でも置かれてしまう台まで対応する無料のリビング片付けチェックリスト。",
      intro:
        "リビングは他の部屋の散らかりが最終的に表に出てくる場所です。このチェックリストは壊れた装飾品、埃をかぶったお土産、共用の薬箱にある期限切れの薬、誰も本気で残したくないチラシを対象にしています。",
      resetDescription:
        "収納に手をつける前に、まずローテーブルや棚など一つの台を片付けましょう。目に見えてすっきりすると、その先も進めやすくなります。",
    },
    es: {
      metaDescription:
        "Lista gratuita para ordenar el salón: adornos rotos, cables y discos, medicamentos caducados y las superficies donde acaba todo lo demás.",
      intro:
        "El salón es donde el desorden de las demás habitaciones queda a la vista. Esta lista se centra en adornos rotos, recuerdos llenos de polvo, medicinas caducadas del cajón común y folletos que nadie quería guardar.",
      resetDescription:
        "Despeja una superficie, la mesa de centro o una balda, antes de tocar los armarios. Un salón visiblemente más despejado hace más fácil todo lo que venga después.",
    },
  },
  balcony: {
    en: {
      metaDescription:
        "Free balcony declutter checklist for withered plants, expired fertilizer, cracked plastic bins, and gear that never made it back inside.",
      intro:
        "Balconies become storage by accident, one abandoned planter or forgotten fish tank at a time. This checklist covers what's actually dead, cracked, or expired out there, not just what's dusty.",
      resetDescription:
        "Sort what's alive from what isn't first. A balcony you can actually stand on is worth more than a few pots you keep meaning to revive.",
    },
    zh: {
      metaDescription:
        "免费阳台断舍离清单，涵盖枯萎的盆栽、过期肥料、晒裂的塑料收纳箱，以及那些一直没搬回室内的杂物。",
      intro:
        "阳台常常在不知不觉中变成储物间，一盆废弃的植物、一个被遗忘的鱼缸,慢慢堆起来。这份清单聚焦真正已经死掉、开裂或过期的东西，而不只是落灰的物品。",
      resetDescription:
        "先分清哪些还活着,哪些已经不行了。一个真正能站上去的阳台,比几盆你总说要救活的植物更值得留。",
    },
    ja: {
      metaDescription:
        "枯れた植物、期限切れの肥料、ひび割れたプラスチック収納、屋内に戻されないまま放置された物まで扱う無料のベランダ片付けチェックリスト。",
      intro:
        "ベランダは放置された鉢植えや忘れられた水槽が積み重なり、いつの間にか物置になりがちです。このチェックリストは埃がかぶっているだけの物ではなく、実際に枯れている・割れている・期限切れの物を対象にしています。",
      resetDescription:
        "まず生きている物とそうでない物を仕分けましょう。実際に立てるベランダは、いつか復活させようと思っている鉢植え数個より価値があります。",
    },
    es: {
      metaDescription:
        "Lista gratuita para ordenar la terraza: plantas secas, fertilizante caducado, barreños agrietados y trastos que nunca volvieron a entrar en casa.",
      intro:
        "Las terrazas se convierten en trastero sin querer, una maceta abandonada y un acuario olvidado cada vez. Esta lista cubre lo que realmente está seco, agrietado o caducado ahí fuera, no solo lo que tiene polvo.",
      resetDescription:
        "Separa primero lo que está vivo de lo que no. Una terraza donde puedas estar vale más que unas macetas que llevas meses queriendo recuperar.",
    },
  },
  smartphone: {
    en: {
      metaDescription:
        "Free digital declutter checklist for your phone: dead chat threads, promotional emails, unused app notifications, and contacts you never talk to.",
      intro:
        "Digital clutter works the same way physical clutter does, it just doesn't take up visible space. This checklist covers unsubscribing from noise, muting notifications you never act on, and letting go of contacts and threads that add nothing.",
      resetDescription:
        "Pick one app or inbox, not your whole phone. Ten minutes of unsubscribing does more than an hour of scrolling past the same clutter.",
    },
    zh: {
      metaDescription:
        "免费手机数字断舍离清单，涵盖没用的聊天记录、促销邮件、从不查看的应用通知，以及从不联系的联系人。",
      intro:
        "数字杂物和实体杂物的道理是一样的，只是它不占用看得见的空间。这份清单专注于取消订阅那些噪音邮件、关掉从不处理的通知，以及放下那些毫无意义的联系人和聊天记录。",
      resetDescription:
        "先挑一个 App 或一个收件箱，不用整部手机一起来。花十分钟取消订阅，比刷十次同样的杂乱更有用。",
    },
    ja: {
      metaDescription:
        "不要なチャット履歴、宣伝メール、見ないアプリ通知、連絡を取らない連絡先まで扱う無料のスマートフォン・デジタル片付けチェックリスト。",
      intro:
        "デジタルの散らかりは物理的な散らかりと同じ仕組みですが、目に見える場所を取らないだけです。このチェックリストは不要なメール配信の解除、対応しない通知のミュート、意味を持たなくなった連絡先やチャットを手放すことに焦点を当てています。",
      resetDescription:
        "スマホ全体ではなく、まず一つのアプリか受信箱を選びましょう。10分の配信解除は、同じ散らかりを1時間スクロールするより効果があります。",
    },
    es: {
      metaDescription:
        "Lista gratuita de limpieza digital para el móvil: conversaciones muertas, correos promocionales, notificaciones de apps que no usas y contactos con los que nunca hablas.",
      intro:
        "El desorden digital funciona igual que el físico, solo que no ocupa espacio visible. Esta lista cubre darse de baja del ruido, silenciar notificaciones que nunca atiendes y soltar contactos y grupos que no aportan nada.",
      resetDescription:
        "Elige una app o una bandeja de entrada, no el móvil entero. Diez minutos dándote de baja rinden más que una hora pasando por encima del mismo desorden.",
    },
  },
  "life-philosophy": {
    en: {
      metaDescription:
        "A gentle checklist for letting go of what no longer serves you, one-sided relationships, guilt-driven habits, and a hoarding mindset, not just physical items.",
      intro:
        "Not everything worth decluttering is an object. This list is for the harder, less tangible things, relationships that only take, habits kept out of obligation, and the belief that keeping everything is safer than letting go.",
      resetDescription:
        "There's no daily quota here. Revisit this list when you have the mental space to think about it, not when you're rushing through a to-do list.",
    },
    zh: {
      metaDescription:
        "一份更偏向内心的整理清单，聚焦单向消耗的关系、出于愧疚维持的习惯，以及囤积心态本身，而不只是实体物品。",
      intro:
        "值得断舍离的，不只是物品。这份清单专门针对更难处理、也更抽象的部分：只消耗你的关系、出于责任感维持的习惯，以及那种觉得留着才安全的囤积心态。",
      resetDescription:
        "这里没有每日必须完成的数量。等你有心力认真想清楚的时候再回来看这份清单，而不是赶着打勾。",
    },
    ja: {
      metaDescription:
        "一方的に消耗するだけの人間関係、義務感で続けている習慣、ため込み癖そのものなど、物ではなく心の整理に向けた優しいチェックリスト。",
      intro:
        "手放す価値があるのは物だけではありません。このリストは、より扱いにくく形のない部分、あなたを消耗させるだけの人間関係、義務感で続けている習慣、そして手放すより持っている方が安全だという思い込みを対象にしています。",
      resetDescription:
        "ここには毎日のノルマはありません。タスクをこなすためではなく、じっくり考える余裕があるときにこのリストに戻ってきてください。",
    },
    es: {
      metaDescription:
        "Una lista serena para soltar lo que ya no te sirve: relaciones que solo restan, hábitos sostenidos por obligación y la mentalidad de acumular.",
      intro:
        "No todo lo que conviene soltar es un objeto. Esta lista es para lo más difícil y menos tangible: relaciones que solo toman, hábitos que mantienes por obligación y la idea de que guardarlo todo es más seguro que dejarlo ir.",
      resetDescription:
        "Aquí no hay cuota diaria. Vuelve a esta lista cuando tengas espacio mental para pensarla, no cuando vayas con prisa tachando tareas.",
    },
  },
  "bathroom-laundry": {
    en: {
      metaDescription:
        "Free bathroom and laundry declutter checklist for old sunscreen, dried-up makeup, skincare samples, and worn-out hair accessories.",
      intro:
        "Bathroom clutter is mostly things with an expiration date you haven't checked, last season's sunscreen, samples you took but never used, and makeup that dried out months ago.",
      resetDescription:
        "Start with anything that has a use-by date. Products past their prime aren't saving you money, they're just taking up shelf space.",
    },
    zh: {
      metaDescription:
        "免费卫浴与洗衣区断舍离清单，涵盖过季防晒霜、干掉的化妆品、护肤小样，以及用旧的发饰工具。",
      intro:
        "浴室里的杂物大多是你没检查过保质期的东西，上一季的防晒霜、拿了却没用的小样，还有几个月前就已经干掉的化妆品。",
      resetDescription:
        "先从有保质期的东西开始。过期的产品不会帮你省钱，它们只是在占用架子空间。",
    },
    ja: {
      metaDescription:
        "前シーズンの日焼け止め、乾いた化粧品、スキンケアの試供品、伸びきったヘアアクセサリーまで扱う無料のバスルーム・洗濯片付けチェックリスト。",
      intro:
        "バスルームの散らかりの多くは、期限を確認していない物です。前シーズンの日焼け止め、もらったけれど使っていない試供品、数か月前に乾いてしまった化粧品などです。",
      resetDescription:
        "まず使用期限のある物から始めましょう。期限切れの製品は節約にはならず、ただ棚を占領しているだけです。",
    },
    es: {
      metaDescription:
        "Lista gratuita para ordenar el baño y el lavadero: protector solar viejo, maquillaje reseco, muestras de cosmética y accesorios del pelo dados de sí.",
      intro:
        "El desorden del baño son sobre todo cosas con fecha de caducidad que nadie ha mirado: el protector solar de la temporada pasada, muestras que cogiste y nunca usaste y maquillaje que se secó hace meses.",
      resetDescription:
        "Empieza por todo lo que tenga fecha de caducidad. Los productos pasados no te están ahorrando dinero, solo ocupan balda.",
    },
  },
  "home-office": {
    en: {
      metaDescription:
        "Free home office declutter checklist for dried-out pens, outdated planners, excess stationery, and paper you're keeping just in case.",
      intro:
        "A home office fills up with supplies you bought once and now just store, dried-out markers, planners from a year you've moved past, and business cards for people you'll never call.",
      resetDescription:
        "Clear the desk surface before the drawers. A desk you can actually work on beats a fully organized drawer you never open.",
    },
    zh: {
      metaDescription:
        "免费家庭办公室断舍离清单，涵盖干掉的笔、过时的计划本、多余的文具，以及那些留着以防万一的纸张。",
      intro:
        "家庭办公室很容易堆满买过一次却只是存放着的用品，干掉的马克笔、早就翻篇的计划本，还有你永远不会打的名片。",
      resetDescription:
        "先清桌面，再收抽屉。一张真正能用来工作的桌子，比一个整理得很整齐却从不打开的抽屉更有用。",
    },
    ja: {
      metaDescription:
        "乾いたペン、古くなった手帳、余った事務用品、念のため取ってある紙類まで扱う無料のホームオフィス片付けチェックリスト。",
      intro:
        "ホームオフィスは一度買って今はしまってあるだけの物でいっぱいになりがちです。乾いたマーカー、もう終わった年の手帳、二度と連絡しない人の名刺などです。",
      resetDescription:
        "引き出しより先にデスクの上を片付けましょう。実際に作業できるデスクは、開けることのない整った引き出しより価値があります。",
    },
    es: {
      metaDescription:
        "Lista gratuita para ordenar el despacho: bolígrafos gastados, agendas de años pasados, exceso de papelería y papeles guardados por si acaso.",
      intro:
        "Un despacho en casa se llena de material que compraste una vez y ahora solo almacenas: rotuladores secos, agendas de un año que ya has dejado atrás y tarjetas de visita de gente a la que nunca vas a llamar.",
      resetDescription:
        "Despeja la mesa antes que los cajones. Una mesa donde puedas trabajar de verdad vale más que un cajón perfectamente ordenado que nunca abres.",
    },
  },
  closets: {
    en: {
      metaDescription:
        "Free closet declutter checklist for clothes that no longer fit, unworn shoes, tagged items you never wore, and pieces kept out of guilt.",
      intro:
        "Closets hide easy decisions behind full racks, clothes that stopped fitting a year ago, shoes that hurt, and tags you never cut off. This checklist starts with those instead of the sentimental pieces.",
      resetDescription:
        "Sort the easy noes before the hard maybes. Clothes you already know you won't wear again don't need another season to decide.",
    },
    zh: {
      metaDescription:
        "免费衣柜断舍离清单，涵盖不再合身的衣服、不穿的鞋子、买回来没穿过的吊牌衣物，以及出于愧疚留下的单品。",
      intro:
        "衣柜里挂满衣服，却藏着最容易做的决定：一年前就不合身的衣服、穿着不舒服的鞋子，还有从没剪过吊牌的新衣。这份清单从这些容易决定的东西开始，而不是先碰有感情牵绊的物品。",
      resetDescription:
        "先处理容易说不的，再面对犹豫不决的。已经确定不会再穿的衣服，不需要再等一季才做决定。",
    },
    ja: {
      metaDescription:
        "サイズの合わなくなった服、履いていない靴、タグが付いたまま着ていない服、罪悪感で残している物まで扱う無料のクローゼット片付けチェックリスト。",
      intro:
        "クローゼットはぎっしり詰まっているのに、実は簡単に決められる物が隠れています。一年前からサイズの合わない服、履くと痛い靴、タグを切っていない服などです。このチェックリストは思い出の品より先に、そうした決めやすい物から始めます。",
      resetDescription:
        "迷う物より先に、簡単に手放せる物から片付けましょう。もう着ないと分かっている服は、もう一シーズン様子を見る必要はありません。",
    },
    es: {
      metaDescription:
        "Lista gratuita para ordenar el armario: ropa que ya no te vale, zapatos sin estrenar, prendas con la etiqueta puesta y cosas que guardas por culpa.",
      intro:
        "Los armarios esconden decisiones fáciles detrás de una barra llena: ropa que dejó de valerte hace un año, zapatos que hacen daño y etiquetas que nunca cortaste. Esta lista empieza por ahí, no por lo sentimental.",
      resetDescription:
        "Resuelve los noes fáciles antes que las dudas difíciles. La ropa que ya sabes que no te vas a volver a poner no necesita otra temporada para decidirse.",
    },
  },
  "kids-items": {
    en: {
      metaDescription:
        "Free kids' items declutter checklist for dried-out art supplies, un-photographed artwork, worn-out costumes, and forgotten party favors.",
      intro:
        "Kids' clutter grows fast because so much of it arrives as gifts and party favors nobody asked for. This checklist covers dried-out art supplies, artwork worth photographing before it goes, and costumes past their last wear.",
      resetDescription:
        "Photograph the artwork you want to keep before deciding what to let go of. A photo takes up no shelf space and keeps the memory intact.",
    },
    zh: {
      metaDescription:
        "免费儿童用品断舍离清单，涵盖干掉的美术用品、还没拍照留存的孩子作品、破旧的变装服，以及被遗忘的派对小礼品。",
      intro:
        "孩子的东西之所以堆积得快，是因为很多都是别人送的礼物或派对小礼品，从来没人真正问过要不要留。这份清单专门处理干掉的美术用品、值得先拍照再决定去留的作品，以及早就不穿的变装服。",
      resetDescription:
        "决定去留之前，先把想留住的作品拍下来。照片不占架子空间，却能把回忆完整保留下来。",
    },
    ja: {
      metaDescription:
        "乾いた画材、写真に残していない子どもの作品、ボロボロになったコスチューム、忘れられたパーティーの記念品まで扱う無料の子どものもの片付けチェックリスト。",
      intro:
        "子どものものが増えやすいのは、頼んでもいないプレゼントやパーティーの記念品として届く物が多いからです。このチェックリストは乾いてしまった画材、手放す前に撮影しておきたい作品、着なくなったコスチュームを対象にしています。",
      resetDescription:
        "手放すかどうか決める前に、残したい作品は写真に撮っておきましょう。写真は棚を占領せず、思い出はそのまま残ります。",
    },
    es: {
      metaDescription:
        "Lista gratuita para ordenar las cosas de los niños: material de manualidades reseco, dibujos sin fotografiar, disfraces gastados y detalles de cumpleaños olvidados.",
      intro:
        "Las cosas de los niños se acumulan rápido porque gran parte llega como regalo o como detalle de fiesta que nadie pidió. Esta lista cubre el material reseco, los dibujos que merece la pena fotografiar antes de soltarlos y los disfraces que ya no dan para más.",
      resetDescription:
        "Fotografía los dibujos que quieras conservar antes de decidir qué se va. Una foto no ocupa balda y mantiene el recuerdo intacto.",
    },
  },
};

export function getAreaContent(slug: string, locale: Locale): AreaCopy | undefined {
  return areaContent[slug]?.[locale];
}
