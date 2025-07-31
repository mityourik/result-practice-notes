import { getPost, updatePost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
    const accessRoles = [ROLE.ADMIN];
    const access = await sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: 'Доступ к ролям запрещен для данного пользователя',
            res: null,
        };
    }

    await updatePost(newPostData);

    const updatedPost = await getPost(newPostData.id);

    return {
        error: null,
        res: updatedPost,
    };
};
