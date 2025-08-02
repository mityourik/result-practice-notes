import { API_CONFIG } from '../config';
import { transformPost } from '../transformers';

export const getPosts = async () => {
    return fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}`)
        .then((loadedPosts) => loadedPosts.json())
        .then((loadedPosts) => loadedPosts && loadedPosts.map(transformPost));
};
