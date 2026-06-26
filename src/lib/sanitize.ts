// HTML sanitization utility using DOMPurify
// Required for any dangerouslySetInnerHTML usage to prevent XSS attacks

import DOMPurify from 'dompurify'

/**
 * Sanitize HTML content for safe rendering via dangerouslySetInnerHTML.
 * Strips all scripts, event handlers, and dangerous attributes.
 * Allows only safe formatting tags (strong, em, p, br, span, etc.).
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: return basic escaped version (no DOMPurify in Node)
    return html
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'b', 'i', 'span', 'div', 'ul', 'ol', 'li', 'blockquote'],
    ALLOWED_ATTR: ['class'],
  })
}

/**
 * Convert simple markdown-like formatting to sanitized HTML.
 * Handles **bold** and \n\n paragraph breaks.
 */
export function formatCommentary(text: string): string {
  const html = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="mt-3">')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')

  return sanitizeHtml(html)
}
