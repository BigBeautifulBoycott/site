// src/lib/blocks.ts
// Robust renderer for Strapi v5 "Blocks" -> HTML
// No styling here—just clean semantic markup.

type BlockNode =
  | { type: 'paragraph'; children?: any[] }
  | { type: 'heading'; level?: number; children?: any[] }
  | { type: 'list'; format?: 'ordered' | 'unordered'; children?: any[] }
  | { type: 'list-item'; children?: any[] }
  | { type: 'quote'; children?: any[] }
  | { type: 'link'; url?: string; children?: any[] }
  | { type: 'line'; children?: any[] }          // soft line
  | { type: 'text'; text?: string; bold?: boolean; italic?: boolean; underline?: boolean }
  | Record<string, any>;

function esc(s = '') {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderText(n: any): string {
  let t = esc(n?.text ?? '');
  if (!t) return '';
  if (n.underline) t = `<u>${t}</u>`;
  if (n.italic)    t = `<em>${t}</em>`;
  if (n.bold)      t = `<strong>${t}</strong>`;
  return t;
}

function renderChildren(children?: any[]): string {
  if (!Array.isArray(children)) return '';
  return children.map(renderNode).join('');
}

function renderNode(node: BlockNode): string {
  switch (node?.type) {
    case 'text':
      return renderText(node);

    case 'line': // Strapi soft line break inside paragraphs
      return '<br>';

    case 'paragraph': {
      const html = renderChildren(node.children);
      // Drop empty <p> that Strapi sometimes emits
      return html.trim() ? `<p>${html}</p>` : '';
    }

    case 'heading': {
      const lvl = Math.min(Math.max(Number(node.level ?? 2), 1), 6);
      return `<h${lvl}>${renderChildren(node.children)}</h${lvl}>`;
    }

    case 'list': {
      const tag = node.format === 'ordered' ? 'ol' : 'ul';
      return `<${tag}>${renderChildren(node.children)}</${tag}>`;
    }

    case 'list-item':
      return `<li>${renderChildren(node.children)}</li>`;

    case 'quote':
      return `<blockquote>${renderChildren(node.children)}</blockquote>`;

    case 'link': {
      const url = String(node.url || '#');
      const safe = esc(url);
      const inner = renderChildren(node.children) || safe;
      const ext = /^https?:\/\//i.test(url);
      const attrs = ext ? ` target="_blank" rel="noopener"` : '';
      return `<a href="${safe}"${attrs}>${inner}</a>`;
    }

    default:
      // Unknown block types: render their children so content isn’t lost
      return renderChildren((node as any)?.children);
  }
}

/** Public API */
export function renderBlocks(blocks: any): string {
  const nodes = Array.isArray(blocks) ? blocks : [];
  return nodes.map(renderNode).join('').trim();
}
