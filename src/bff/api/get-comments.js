import { API_CONFIG } from '../config';
import { transformComment } from '../transformers';

const ALL_COMMENTS_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS}`;
const POST_COMMENTS_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POST_COMMENTS}`;

export const getComments = async (postId) => {
    const url =
        postId === undefined
            ? ALL_COMMENTS_URL
            : `${POST_COMMENTS_URL}${postId}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Не удалось загрузить комментарии');
    }

    const loadedComments = await response.json();
    return loadedComments.map(transformComment);
};
