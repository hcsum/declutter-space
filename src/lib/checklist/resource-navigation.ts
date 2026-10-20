import type { Locale } from "@/i18n/config";
import { isPageAvailable } from "@/i18n/page-locales";
import { checklistSeoContent } from "./seo-content";

export const resourceNavigationCopy = {
  en: {
    title: "Free room-by-room declutter checklists",
    intro:
      "Choose a room, download a printable PDF, or check off tasks online. Start for free without an account; your edits and progress are saved in this browser. Sign in only if you want cloud sync.",
    online: "Start the online checklist",
    downloads: "Browse free PDF checklists",
    resources: "Printable checklists",
    guides: "Room-by-room guides",
  },
  zh: {
    title: "免费的分房间断舍离清单",
    intro:
      "选一个房间，下载可打印的 PDF，或直接在线勾选任务。无需注册即可免费开始，修改和进度会保存在当前浏览器中；需要云同步时再登录。",
    online: "开始在线勾选",
    downloads: "浏览免费 PDF 清单",
    resources: "可打印清单",
    guides: "分房间整理指南",
  },
  ja: {
    title: "部屋別の無料断捨離チェックリスト",
    intro:
      "部屋を選んで印刷用PDFをダウンロードするか、オンラインで項目をチェックできます。登録不要で無料で始められ、編集内容と進捗はこのブラウザに保存されます。クラウド同期を使う場合のみログインしてください。",
    online: "オンラインでチェックを始める",
    downloads: "無料PDFチェックリストを見る",
    resources: "印刷用チェックリスト",
    guides: "部屋別の片付けガイド",
  },
  es: {
    title: "Listas gratuitas para ordenar cada habitación",
    intro:
      "Elige una habitación, descarga un PDF para imprimir o marca las tareas en línea. Empieza gratis y sin cuenta: tus cambios y avances se guardan en este navegador. Inicia sesión solo si quieres sincronizarlos en la nube.",
    online: "Empezar la lista en línea",
    downloads: "Ver listas PDF gratuitas",
    resources: "Listas para imprimir",
    guides: "Guías por habitación",
  },
} satisfies Record<Locale, Record<string, string>>;

export function getResourceGuideLinks(locale: Locale) {
  return checklistSeoContent[locale].roomLinks.filter((link) =>
    isPageAvailable(locale, link.href),
  );
}
