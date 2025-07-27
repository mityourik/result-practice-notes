import { getComments, getPost } from '../api';
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

        let comments = [];
        try {
            comments = await getComments(postId);
        } catch (commentError) {
            console.warn('Не удалось загрузить комментарии:', commentError);
            comments = [];
        }

        return { error: null, res: { ...post, comments } };
    } catch (error) {
        return formatError(error);
    }
};
