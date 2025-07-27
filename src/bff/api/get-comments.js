import { API_CONFIG } from '../config';

export const getComments = async (postId) => {
    const response = await fetch(
        `${API_CONFIG.BASE_URL}/comments?post_id=${postId}`
    );
    if (!response.ok) {
        throw new Error('Не удалось загрузить комментарии поста');
    }
    return response.json();
};
