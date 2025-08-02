import { API_CONFIG } from '../config';
import { transformPost } from '../transformers';

export const getPosts = async (page, limit) => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}?_page=${page}&_per_page=${limit}`;

    return fetch(url).then(async (response) => {
        const responseData = await response.json();

        const { data: loadedPosts, last: lastPage } = responseData;

        return {
            posts: loadedPosts && loadedPosts.map(transformPost),
            lastPage: lastPage || 1,
        };
    });
};
