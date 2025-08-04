import { addComment, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const addPostComment = async (hash, postId, userId, content) => {
    const accessRoles = [ROLE.ADMIN, ROLE.USER, ROLE.MODERATOR];

    const access = await sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: 'Доступ к ролям запрещен для данного пользователя',
            res: null,
        };
    }

    await addComment(postId, userId, content);
    const post = await getPost(postId);

    const commentsWithAuthors = await getPostCommentsWithAuthor(postId);

    return {
        error: null,
        res: { ...post, comments: commentsWithAuthors },
    };
};
