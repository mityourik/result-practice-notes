import { deleteComment, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const removeComment = async (hash, postId, commentId) => {
    const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

    const access = await sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: 'Доступ к ролям запрещен для данного пользователя',
            res: null,
        };
    }

    try {
        await deleteComment(commentId);
        const post = await getPost(postId);
        const commentsWithAuthors = await getPostCommentsWithAuthor(postId);

        return {
            error: null,
            res: { ...post, comments: commentsWithAuthors },
        };
    } catch (error) {
        return {
            error: error.message || 'Ошибка при удалении комментария',
            res: null,
        };
    }
};
