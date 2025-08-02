export const sanitizeContent = (content) => {
    if (!content || typeof content !== 'string') {
        return '';
    }

    let sanitizedContent = content.replace(/<[^>]*>/g, '');

    sanitizedContent = sanitizedContent
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/')
        .replace(/&nbsp;/g, ' ');

    sanitizedContent = sanitizedContent.replace(/\s+/g, ' ');

    return sanitizedContent.trim();
};
