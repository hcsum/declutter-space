import Link from "next/link";
import {
  ChecklistLink,
  GuideBody,
  GuideShell,
  GuideSources,
  type GuideSource,
} from "./ReviewedGuide";

export const japaneseAdhdMetadata = {
  title: "ADHDのある方向け 片付けチェックリスト｜一つの作業から",
  description:
    "玄関、キッチン、洗面所など、場所ごとに選べる小さな片付けの作業例。保留する物の扱い方と、ごみの収集日まで含めた次の一歩をまとめました。",
};

const sources: GuideSource[] = [
  {
    id: "J1",
    label: "mona51：整理と清潔を分けて考えた個人の体験談",
    url: "https://note.com/mona51life/n/n620fdd4fddc0",
  },
  {
    id: "R3",
    label: "時間制限のある掃除が合わなかった個人の投稿（保存ページ）",
    url: "https://web.archive.org/web/20250802030251/https://www.reddit.com/r/ADHD/comments/jw9bub/hot_tip_10_min_speed_cleaning_challenges_dont/",
  },
  {
    id: "R8",
    label: "タイマーが始める助けになった個人の投稿（保存ページ）",
    url: "https://web.archive.org/web/20230205175921/https://www.reddit.com/r/ADHD/comments/10uiq6j/gaslighting_myself_into_cleaning_by_setting_a/",
  },
  {
    id: "R4",
    label: "小さな作業の数自体が負担になる経験の投稿・コメント（保存ページ）",
    url: "https://web.archive.org/web/20210727070917/https://www.reddit.com/r/ADHD/comments/os2v10/nrt_people_think_tasks_like_cleaning_your_room_is/",
  },
  {
    id: "R5",
    label: "保留箱の蓄積と寄付の難しさについての投稿・コメント（保存ページ）",
    url: "https://web.archive.org/web/20250311174910/https://www.reddit.com/r/adhdwomen/comments/1f80mqf/how_do_you_manage_the_overwhelming_number_of_doom/",
  },
  {
    id: "R6",
    label: "箱を一時的な対処として捉えた個人の投稿（保存ページ）",
    url: "https://web.archive.org/web/20230117190559/https://www.reddit.com/r/adhdwomen/comments/10ejo75/reframing_doom_boxes_as_coping_boxes/",
  },
  {
    id: "J2",
    label: "フジワラ：戻す手順と見える収納についての個人の体験談",
    url: "https://note.com/syrupempt/n/n9ee60fc60c3d",
  },
  {
    id: "J3",
    label: "なちゅ。：分類や日付のメモと、物が見えすぎる難しさについての体験談",
    url: "https://note.com/itacchiku/n/n349c01966d1d",
  },
  {
    id: "J4",
    label:
      "ひなた みあ：物が見え続けることを好まない個人の体験談（商品リンクを含む）",
    url: "https://note.com/dear_lemur6072/n/nce1f72551943",
  },
  {
    id: "J5",
    label: "ADHD_note：ごみをまとめたあとに出し忘れた個人の投稿",
    url: "https://note.com/adhd_note/n/n841d931ad10c",
  },
  {
    id: "J6",
    label: "横浜市：ごみを出す時間に関する案内（横浜市の例）",
    url: "https://www.city.yokohama.lg.jp/faq/kukyoku/shigen/shigen-gyomu/20211019160027461.html",
  },
  {
    id: "S3",
    label: "横浜市：粗大ごみの収集をしてほしい（横浜市の例）",
    url: "https://www.city.yokohama.lg.jp/kurashi/sumai-kurashi/gomi-recycle/gomi/shushu/sodaigomi/dashikata/shuushuu.html",
  },
  {
    id: "J7",
    label: "発達障害情報・支援センター：発達障害者支援センターの活動",
    url: "https://www.rehab.go.jp/ddis/action/work/",
  },
  {
    id: "S4",
    label: "発達障害情報・支援センター：公的な情報・支援先を探す入口",
    url: "https://www.rehab.go.jp/ddis/",
  },
];

const body = `## まずは、一つだけ選ぶ

物を戻したいのか、汚れを落としたいのか、今困っている方を選びます。両方を一度に行う必要はありません。物を一つ移したあとに、食器洗いや拭き掃除まで続けることを、このリストの条件にはしません。 [J1]

- 帰宅して靴を脱ぐ場所がない → 玄関の靴を一足、自分の置き場所へ戻す。
- 食事を置く場所がない → テーブルのカップを台所へ運ぶ。
- 寝る場所に物がある → ベッドや布団を使う範囲から、自分の物を一つ移す。
- どこから始めるか決められない → 今手に持っている物の置き場所を一つ決める。

タイマーは、作業を続けるか止めるかを確認するための選択肢です。時間内に部屋全体を終える必要はありません。音が負担になる場合や、時間を決めると焦ってしまう場合は、使わずに「カップを一つ運ぶ」など、終わりが分かる作業を選べます。途中で止めても構いません。 [R3, R8]

## 場所別の小さな作業

以下は一度に全部行うリストではありません。一つ選んだら、それが今回の作業の全部です。終えたあとに、次の項目へ進む必要はありません。 [R4]

### 玄関

- 自分の靴を一足、決めた場所へ戻す。
- 空の宅配箱を一つ、地域の出し方に合わせてまとめる。
- 鍵や定期券を、次に探す場所へ戻す。
- 外へ出す予定の物があれば、通り道をふさがない場所へ移す。

### キッチン

- カップを一つ、台所へ運ぶ。
- シンクの食べかすを、地域の分別に合わせて片付ける。
- 食事を用意する場所を一か所空ける。
- 食品を一つ確認する。表示の意味や保存状態が分からなければ、確認してから判断する。

### 寝る場所・衣類

- ベッドや布団を使う場所から、自分の物を一つ移す。
- 洗う服を一着、洗濯かごへ入れる。
- もう一度着る服は、洗濯物と分けて決めた場所へ置く。
- 床にある物を一つ、置き場所へ戻す。

### 洗面所・浴室

- 使い終わった容器を一つ確認し、地域の分別方法を調べる。
- 洗面台の一角を空ける。毎日使う物は、取り出しやすい置き方を試す。
- 使用済みタオルを一枚、洗濯かごへ入れる。
- 拭ける状態なら、洗面台の一角を拭く。

### 机・兼用テーブル

- カップや食器を一つ、台所へ運ぶ。
- 郵便物を一通確認する。支払い・返信などが必要なら、次にすることと期限をメモする。
- 捨ててよいと確認できた紙だけ、地域の方法に合わせて処理する。
- 今使っている充電ケーブルを、次に使う場所へ戻す。

## 決められない物は、理由を付けて保留する

保留するなら、入れ物に「何を確認するか」を書きます。

例：

- 充電器 → 家にある機器に合うか確認する。
- 家族の書類 → 持ち主に確認する。
- 手放すか迷う服 → 試着してから考える。

余裕があれば、次に確認する日も決めます。日を決めることまで負担になるときは、一つの物に確認したいことを書くだけで終えて構いません。期限のある支払い・返信の書類は、一般の保留箱とは分けて置きます。

確認する日が過ぎても、自動的に処分する日にはなりません。箱に入れたまま使わなかったからといって、中身を確認せずに捨てる必要はありません。書類、薬、鍵、他の人の物は、ひとまとめに処分しないでください。 [R5, R6, J3]

保留箱がいっぱいなら、箱を増やす前に一つだけ確認します。入れ物を片付けの終点にせず、次の作業を残すために使います。

## しまうと忘れる、見えていると気になるとき

しまうと忘れる場合は、よく使う物を少量だけ見える位置に置く、外側にラベルを付けるなどの方法を試せます。見える物が多いと落ち着かない場合は、閉めたときは隠れ、開けると中身を確認できる置き方も選べます。

まず一種類だけ試し、戻しにくい・探しにくい・気が散ると感じたら、置き方を変えます。透明な収納や新しい家具を買うことから始める必要はありません。これは個人の経験から考えた選択肢で、全ての人に合う方法ではありません。 [J2, J3, J4]

## ごみは「まとめる」と「出す」を分ける

「分別した」「収集日を確認した」「収集場所へ出した」は別の作業です。今日はどこまでできたかを分けて残します。袋を玄関の近くに置くだけでは、搬出が終わったことにはなりません。 [J5]

お住まいの地区と品目の出し方を確認し、出せる日・時間・場所をメモします。収集日までは、通り道や出入口をふさがない場所で保管します。指定された日や時間より前に、屋外へ出すことを前提にしないでください。出し忘れた場合は、次に出せる日を確認するところで今日は終えて構いません。時刻や集積場所のルールは、自分の地区で確認します。 [J6]

粗大ごみは、自治体の申込み方法、手数料、出す日時・場所を確認してください。たとえば横浜市は事前申込み制です。この例を、そのまま他の市区町村のルールとして使うことはできません。 [S3]

確認するときの検索例：

- 「市区町村名 ごみ 分別 品目名」
- 「市区町村名 ごみ 収集日」
- 「市区町村名 粗大ごみ 申込み」

自治体の公式ページを開き、自分の地区と品目に合う案内か確認します。分からない物を無理に一つの袋へまとめず、自治体や製造元に確認してください。

## 今日はここで終える

- 作業した場所を、使える状態に戻す。
- 通り道や出入口をふさがない。
- 残った物について、次にすることを一つ書く。

再開用のメモは「続き」より、「充電器が使えるか確認する」「粗大ごみの申込みをする」のように書くと、作業の内容を残せます。

## よくある質問

### 毎日やらないといけませんか？

毎日行うことを前提にしなくても構いません。必要な場所と、その日にできる作業を選んでください。チェックが付かなかった日も、次に再開するためのメモを残せます。

### 一部屋しかない場合は？

部屋の名前ではなく、用途で選びます。「寝る場所」「食事を置く場所」「机の一角」のように範囲を決めてください。

### 物を捨てないと片付けたことになりませんか？

置き場所に戻したり、使う場所を空けたりする作業も選べます。持ち主が自分でない物は、本人の確認なしに処分しないでください。家族の物が共用部分にある場合は、食事を置く場所など、空けておきたい範囲を相談します。

### この方法が合わないときは？

全ての人に同じ方法が合うとは限りません。片付けを含む日常生活の困りごとが続く場合は、お住まいの地域の発達障害者支援センターなどに、相談できる内容を確認できます。地域によって支援内容は異なり、訪問して片付けるサービスを約束するものではありません。 [J7, S4]`;

export default function JapaneseAdhdGuide() {
  return (
    <GuideShell>
      <section className="rounded-[2rem] border border-outline-variant bg-surface px-6 py-10 dark:border-gray-600 dark:bg-gray-800 md:px-10 md:py-14">
        <h1 className="text-[26px] font-bold leading-snug text-on-surface dark:text-white md:text-5xl">
          <span className="block">ADHDのある方向け</span>
          <span className="block">片付けチェックリスト</span>
        </h1>
        <p className="mt-6 text-lg leading-8">
          部屋全体を片付けようとせず、今使いたい場所を一つ選びます。「玄関で靴を一足そろえる」「机のカップを台所へ運ぶ」など、次にすることが分かる作業から始めてください。
        </p>
        <p className="mt-4">
          全部を終える必要はありません。かかる時間や使いやすい方法は、人やその日の状態によって違います。
        </p>
        <p className="mt-4">
          このページは、日常の片付けを手伝うための作業例です。ADHDの診断や治療の代わりにはなりません。
        </p>
        <div className="mt-8">
          <ChecklistLink japanese />
        </div>
      </section>
      <GuideBody body={body} sources={sources} />
      <section className="rounded-[2rem] bg-surface px-6 py-8 dark:bg-gray-800 md:px-10">
        <h2 className="text-2xl font-bold text-on-surface dark:text-white">
          部屋別のガイド
        </h2>
        <ul className="mt-5 space-y-3">
          {[
            ["how-to-declutter-your-bedroom", "寝室を片付ける方法"],
            ["how-to-declutter-your-kitchen", "キッチンを片付ける方法"],
            ["how-to-declutter-sentimental-items", "思い出の品を片付ける方法"],
          ].map(([path, label]) => (
            <li key={path}>
              <Link
                className="inline-flex min-h-11 items-center text-primary underline underline-offset-4 dark:text-orange-300"
                href={`/ja/${path}`}
              >
                {label} →
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <ChecklistLink japanese />
        </div>
      </section>
      <GuideSources japanese sources={sources} />
    </GuideShell>
  );
}
