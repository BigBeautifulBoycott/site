// src/lib/blocks.ts
export function renderBlocks(nodes: any[] = []): string {
  const esc = (s = "") =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const renderText = (t: any) => {
    let out = esc(t.text ?? "");
    if (t.code) out = `<code>${out}</code>`;
    if (t.underline) out = `<u>${out}</u>`;
    if (t.strikethrough) out = `<s>${out}</s>`;
    if (t.italic) out = `<em>${out}</em>`;
    if (t.bold) out = `<strong>${out}</strong>`;
    return out;
  };
  const renderChildren = (children: any[] = []) => children.map(renderNode).join("");
  function renderNode(node: any): string {
    if (node?.text !== undefined) return renderText(node);
    const { type, children = [] } = node || {};
    switch (type) {
      case "heading": {
        const level = Math.min(Math.max(node.level ?? 2, 1), 6);
        return `<h${level}>${renderChildren(children)}</h${level}>`;
      }
      case "paragraph": return `<p>${renderChildren(children)}</p>`;
      case "quote": return `<blockquote>${renderChildren(children)}</blockquote>`;
      case "list":
      case "bulleted-list": return `<ul>${renderChildren(children)}</ul>`;
      case "numbered-list": return `<ol>${renderChildren(children)}</ol>`;
      case "list-item": return `<li>${renderChildren(children)}</li>`;
      case "link": {
        const href = esc(node.url || node.href || "#");
        const rel = href.startsWith("/") ? "" : ` rel="noopener noreferrer" target="_blank"`;
        return `<a href="${href}"${rel}>${renderChildren(children)}</a>`;
      }
      case "code": return `<pre><code>${esc(node.code || "")}</code></pre>`;
      default: return renderChildren(children);
    }
  }
  return nodes.map(renderNode).join("");
}
