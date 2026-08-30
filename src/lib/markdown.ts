/**
 * Rendu Markdown volontairement minimal (pas de dépendance externe) :
 * titres ##, gras **, liens [texte](url), listes -/1. et paragraphes.
 * Suffisant pour les articles de blog édités depuis /admin/blog.
 */
function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary font-medium hover:underline">$1</a>');
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown.trim().split("\n");
  const html: string[] = [];
  let listBuffer: string[] = [];
  let listType: "ul" | "ol" | null = null;

  function flushList() {
    if (listType && listBuffer.length > 0) {
      html.push(`<${listType} class="my-4 list-inside ${listType === "ul" ? "list-disc" : "list-decimal"} space-y-1.5">`);
      html.push(...listBuffer.map((item) => `<li>${inline(item)}</li>`));
      html.push(`</${listType}>`);
    }
    listBuffer = [];
    listType = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      html.push(`<h2 class="mt-8 mb-3 text-2xl">${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("- ")) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listBuffer.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      if (listType !== "ol") flushList();
      listType = "ol";
      listBuffer.push(line.replace(/^\d+\.\s/, ""));
    } else {
      flushList();
      html.push(`<p class="my-3 leading-relaxed">${inline(line)}</p>`);
    }
  }
  flushList();

  return html.join("\n");
}
