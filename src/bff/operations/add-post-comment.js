import { addComment, getComments, getPost, getUsers } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

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
    const comments = await getComments(postId);
    const users = await getUsers();

    const commentsWithAuthors = comments.map((comment) => {
        if (comment.author) {
            return comment;
        } else if (comment.authorId) {
            const user = users.find(({ id }) => id === comment.authorId);
            return {
                ...comment,
                author: user?.login || 'Неизвестный автор',
            };
        } else {
            return {
                ...comment,
                author: 'Неизвестный автор',
            };
        }
    });

    return {
        error: null,
        res: { ...post, comments: commentsWithAuthors },
    };
};
