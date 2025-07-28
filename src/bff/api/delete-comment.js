import { API_CONFIG } from '../config';

export const deleteComment = async (commentId) => {
    const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS}/${commentId}`,
        {
            method: 'DELETE',
        }
    );

    if (!response.ok) {
        throw new Error('Не удалось удалить комментарий');
    }

    return response.json();
};
