import { deleteComment, getComments, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

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
        const comments = await getComments(postId);

        return {
            error: null,
            res: { ...post, comments },
        };
    } catch (error) {
        return {
            error: error.message || 'Ошибка при удалении комментария',
            res: null,
        };
    }
};
