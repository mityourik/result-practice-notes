import { getPost } from '../api';
import { formatError } from '../utils';

export const fetchPost = async (postId) => {
    try {
        const post = await getPost(postId);

        if (!post) {
            return {
                error: 'Ошибка получения поста',
                res: null,
            };
        }

        return { error: null, res: post };
    } catch (error) {
        return formatError(error);
    }
};
