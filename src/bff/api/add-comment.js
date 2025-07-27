import { API_CONFIG } from '../config';
import { generateDate } from '../utils/generate-date';

export const addComment = async (postId, userId, content) => {
    try {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    author_id: userId,
                    post_id: postId,
                    published_at: generateDate(),
                    content,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.error ||
                    data?.message ||
                    'Ошибка при добавлении комментария'
            );
        }

        return data;
    } catch (err) {
        throw new Error(
            err?.error || err?.message || 'Ошибка при добавлении комментария'
        );
    }
};
