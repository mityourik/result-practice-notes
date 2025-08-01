import { addPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { formatError } from '../utils';

export const createPost = async (hash, postData) => {
    try {
        const accessRoles = [ROLE.ADMIN];
        const access = await sessions.access(hash, accessRoles);

        if (!access) {
            return {
                error: 'Доступ к созданию постов запрещен для данного пользователя',
                res: null,
            };
        }

        const newPost = await addPost(postData);

        return {
            error: null,
            res: newPost,
        };
    } catch (error) {
        return formatError(error);
    }
};
