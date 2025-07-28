import { getComments, getPost, getUsers } from '../api';
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

        const users = await getUsers();

        const commentsWithAuthors = comments.map((comment) => {
            if (comment.author) {
                // Если у комментария уже есть поле author, используем его
                return comment;
            } else if (comment.authorId) {
                // Если есть только authorId, находим пользователя
                const user = users.find(({ id }) => id === comment.authorId);
                return {
                    ...comment,
                    author: user?.login || 'Неизвестный автор',
                };
            } else {
                // Если нет ни author, ни authorId
                return {
                    ...comment,
                    author: 'Неизвестный автор',
                };
            }
        });

        return { error: null, res: { ...post, comments: commentsWithAuthors } };
    } catch (error) {
        return formatError(error);
    }
};
