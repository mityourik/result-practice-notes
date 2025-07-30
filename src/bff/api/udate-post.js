import { API_CONFIG } from '../config';

export const updatePost = ({ id, imageUrl, title, content }) =>
    fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.POSTS + `/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            image_url: imageUrl,
            title,
            content,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Не удалось обновить пост');
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error(error?.message || 'Ошибка при обновлении поста');
        });
