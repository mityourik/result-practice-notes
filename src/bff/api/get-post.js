import { API_CONFIG } from '../config';
import { transformPost } from '../transformers';

export const getPost = async (postId) => {
    return fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${postId}`
    )
        .then((response) => {
            if (response.ok) {
                return response;
            }

            const error =
                response.status === 404
                    ? 'Такая страница не найдена'
                    : 'Что-то пошло не так, попробуйте позже';

            return Promise.reject(error);
        })
        .then((loadedPost) => loadedPost.json())
        .then((loadedPost) => loadedPost && transformPost(loadedPost));
};
