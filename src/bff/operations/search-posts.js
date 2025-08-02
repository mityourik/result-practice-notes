import { getComments } from '../api';
import { API_CONFIG } from '../config';
import { transformPost } from '../transformers';
import { formatError, getCommentsCount } from '../utils';

export const searchPosts = async (searchPhrase, page, limit) => {
    try {
        const allPostsResponse = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}`
        );
        const allPosts = await allPostsResponse.json();

        const transformedPosts = allPosts.map(transformPost);

        const searchTerm = searchPhrase.trim().toLowerCase();
        const filteredPosts = transformedPosts.filter((post) => {
            return post.title.toLowerCase().includes(searchTerm);
        });

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
        const totalPages = Math.ceil(filteredPosts.length / limit);

        const comments = await getComments();

        if (!comments) {
            return {
                error: 'Ошибка получения комментариев',
                res: { posts: [], lastPage: 1 },
            };
        }

        return {
            error: null,
            res: {
                posts: paginatedPosts.map((post) => ({
                    ...post,
                    commentsCount: getCommentsCount(comments, post.id),
                })),
                lastPage: totalPages || 1,
            },
        };
    } catch (error) {
        console.error('❌ DEBUG searchPosts: Ошибка:', error);
        return formatError(error);
    }
};
