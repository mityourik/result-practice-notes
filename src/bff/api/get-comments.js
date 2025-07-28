import { API_CONFIG } from '../config';
import { transformComment } from '../transformers';

export const getComments = async (postId) => {
    const response = await fetch(
        `${API_CONFIG.BASE_URL}/comments?post_id=${postId}`
    );

    if (!response.ok) {
        throw new Error('Не удалось загрузить комментарии поста');
    }

    const loadedComments = await response.json();
    return loadedComments.map(transformComment);
};
