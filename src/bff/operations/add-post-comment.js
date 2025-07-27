import { addComment, getComments, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const addPostComment = async (userSession, postId, userId, content) => {
    const accessRoles = [ROLE.ADMIN, ROLE.USER, ROLE.MODERATOR];

    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: 'Доступ к ролям запрещен для данного пользователя',
            res: null,
        };
    }

    await addComment(postId, userId, content);
    const post = await getPost(postId);
    const comments = await getComments(postId);

    return {
        error: null,
        res: { ...post, comments },
    };
};
