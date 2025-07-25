import { API_CONFIG } from '../config';
import { transformPost } from '../transformers';

export const getPost = async (postId) => {
    return fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${postId}`
    )
        .then((loadedPost) => loadedPost.json())
        .then((loadedPost) => loadedPost && transformPost(loadedPost));
};
