import { getComments, getPosts } from '../api';
import { formatError, getCommentsCount } from '../utils';

export const fetchPosts = async (page, limit) => {
    try {
        const [{ posts, lastPage }, comments] = await Promise.all([
            getPosts(page, limit),
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
            res: {
                posts: posts.map((post) => ({
                    ...post,
                    commentsCount: getCommentsCount(comments, post.id),
                })),
                lastPage,
            },
        };
    } catch (error) {
        return formatError(error);
    }
};
