import { API_CONFIG } from '../config';

export const deletePost = async (postId) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Не удалось удалить пост');
    }

    return true;
};
