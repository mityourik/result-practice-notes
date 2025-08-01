import { API_CONFIG } from '../config';
import { generateDate } from '../utils/generate-date';

export const addPost = async ({ imageUrl, title, content }) => {
    try {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    image_url: imageUrl,
                    published_at: generateDate(),
                    title,
                    content,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.error || data?.message || 'Ошибка при добавлении поста'
            );
        }

        return data;
    } catch (err) {
        throw new Error(
            err?.error || err?.message || 'Ошибка при добавлении поста'
        );
    }
};
