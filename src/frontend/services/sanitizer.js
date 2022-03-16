import sanitizeHtml from 'sanitize-html';

export const sanitize = (html) => ({
  __html: sanitizeHtml(html, {
    allowedTags: ['img', 'p'],
    allowedAttributes: {
      img: ['src', 'alt', 'srcset']
    }
  })
});
