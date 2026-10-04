import DOMPurify from 'dompurify'

// URLs are checked independently of HTML so React image/link attributes can use
// the same policy. Never accept script URLs, SVG data or control characters.
export function safeContentUrl(value: string | undefined, image = false): string | undefined {
  if (!value || /[\u0000-\u001f\u007f]/.test(value)) return undefined
  const candidate = value.trim()
  if (image && /^data:image\/(?:jpeg|png|webp|gif);base64,[a-z0-9+/=]+$/i.test(candidate)) return candidate
  try {
    const url = new URL(candidate, window.location.href)
    if (url.protocol === 'http:' || url.protocol === 'https:') return url.href
    if (image && url.protocol === 'blob:' && url.origin === window.location.origin) return url.href
    if (!image && ['tel:', 'mailto:'].includes(url.protocol)) return url.href
  } catch { /* malformed URL */ }
  return undefined
}

DOMPurify.addHook('afterSanitizeAttributes', node => {
  for (const name of ['href', 'src']) {
    if (!node.hasAttribute(name)) continue
    const safe = safeContentUrl(node.getAttribute(name) || undefined, name === 'src')
    if (safe) node.setAttribute(name, safe)
    else node.removeAttribute(name)
  }
  if (node.hasAttribute('class')) {
    const classes = (node.getAttribute('class') || '').split(/\s+/).filter(value => /^(?:(?:text|bg|border|font|rounded|gap|space|m[trblxy]?|p[trblxy]?|w|h|max-w|max-h|leading|align|self|items|justify|flex|grid|object)-[a-z0-9-]+|flex|flex-wrap|grid|block|inline|inline-block|underline|italic|overflow-x-auto|break-words|hover:underline)$/.test(value))
    node.setAttribute('class', classes.join(' '))
  }
  if (node.nodeName === 'A') {
    if (node.getAttribute('target') === '_blank') node.setAttribute('rel', 'noopener noreferrer')
    else node.removeAttribute('target')
  }
  // Keep useful typography and layer colours, without positioning, external
  // resources or CSS capable of obscuring the app's controls.
  if (node.hasAttribute('style')) {
    const style = (node as HTMLElement).style
    const safe: string[] = []
    for (const property of ['color', 'background-color', 'font-size', 'font-weight', 'font-style', 'text-align', 'white-space']) {
      const value = style.getPropertyValue(property)
      if (value && /^[a-z0-9#(),.%\s-]+$/i.test(value) && !/url|var|expression|inherit/i.test(value)) safe.push(`${property}:${value}`)
    }
    if (safe.length) node.setAttribute('style', safe.join(';'))
    else node.removeAttribute('style')
  }
})

export function sanitizePopupHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['a', 'abbr', 'b', 'blockquote', 'br', 'caption', 'code', 'dd', 'details', 'div', 'dl', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'hr', 'i', 'img', 'li', 'mark', 'ol', 'p', 'pre', 's', 'small', 'span', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul'],
    ALLOWED_ATTR: ['alt', 'class', 'colspan', 'data-vondst-id', 'height', 'href', 'open', 'rel', 'rowspan', 'src', 'style', 'target', 'title', 'width'],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
  })
}
