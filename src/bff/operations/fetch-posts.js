import { getPosts, getComments } from '../api';
import { formatError, getCommentsCount } from '../utils';

export const fetchPosts = async () => {
    try {
        const [posts, comments] = await Promise.all([
            getPosts(),
            getComments(),
        ]);

        if (!posts) {
            return {
                error: 'Ошибка получения списка постов',
                res: [],
            };
        }

        if (!comments) {
            return {
                error: 'Ошибка получения комментариев',
                res: [],
            };
        }

        return {
            error: null,
            res: posts.map((post) => ({
                ...post,
                commentsCount: getCommentsCount(comments, post.id),
            })),
        };
    } catch (error) {
        return formatError(error);
    }
};
