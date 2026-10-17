// Print only the worksheet, with current form values, rather than the whole guide.
export function printWorksheet(source: HTMLElement, title: string) {
  const frame = document.createElement("iframe");
  frame.title = title;
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText =
    "position:fixed;left:-10000px;top:0;width:800px;height:1000px;border:0";
  document.body.appendChild(frame);
  const doc = frame.contentDocument;
  const view = frame.contentWindow;
  if (!doc || !view) {
    frame.remove();
    return;
  }
  doc.title = title;
  doc.documentElement.lang = source.lang || document.documentElement.lang;
  const style = doc.createElement("style");
  style.textContent = `
    @page { size: auto; margin: 15mm; }
    body { font: 11pt/1.5 sans-serif; color: #111; margin: 0; }
    h2 { font-size: 20pt; margin: 0 0 10pt; } h3 { font-size: 13pt; }
    p { margin: 6pt 0; } section { margin: 14pt 0; }
    label { display: block; margin: 9pt 0; break-inside: avoid; }
    input[type=checkbox] { margin-right: 8pt; }
    .printed-value { display: block; min-height: 26pt; border-bottom: 1px solid #aaa; white-space: pre-wrap; overflow-wrap: anywhere; }
    table { width: 100%; border-collapse: collapse; font-size: 10pt; }
    th, td { border: 1px solid #aaa; padding: 6pt; text-align: left; }
    tr { break-inside: avoid; } thead { display: table-header-group; }
    a { color: inherit; text-decoration: none; } button { display: none; }
  `;
  doc.head.appendChild(style);
  const clone = source.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-no-print]").forEach((node) => node.remove());
  const originals = source.querySelectorAll<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >("input, textarea, select");
  const copies = clone.querySelectorAll<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >("input, textarea, select");
  copies.forEach((node, index) => {
    const original = originals[index];
    if (node instanceof HTMLInputElement && node.type === "checkbox") {
      node.checked = (original as HTMLInputElement).checked;
      return;
    }
    const value = doc.createElement("span");
    value.className = "printed-value";
    value.textContent =
      original instanceof HTMLSelectElement
        ? original.selectedOptions[0]?.textContent || ""
        : original.value;
    node.replaceWith(value);
  });
  doc.body.appendChild(clone);
  const footer = doc.createElement("p");
  footer.textContent = "declutteryourhome.net";
  doc.body.appendChild(footer);
  view.addEventListener("afterprint", () => frame.remove(), { once: true });
  // Allow the isolated document to lay out before opening the native print dialog.
  window.setTimeout(() => {
    view.focus();
    view.print();
  }, 100);
  window.setTimeout(() => frame.remove(), 120000);
}
