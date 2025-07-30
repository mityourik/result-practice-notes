export const sanitizeContent = (content) => {
    if (!content || typeof content !== 'string') {
        return '';
    }

    // Удаляем HTML теги
    let sanitizedContent = content.replace(/<[^>]*>/g, '');

    // Декодируем HTML сущности (например, &amp; -> &, &lt; -> <)
    sanitizedContent = sanitizedContent
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/')
        .replace(/&nbsp;/g, ' ');

    // Заменяем множественные пробелы и переносы строк на одиночные пробелы
    sanitizedContent = sanitizedContent.replace(/\s+/g, ' ');

    // Убираем пробелы в начале и конце
    return sanitizedContent.trim();
};
