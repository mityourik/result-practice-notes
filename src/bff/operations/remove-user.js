import { deleteUser } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeUser = async (hash, userId) => {
    const accessRoles = [ROLE.ADMIN];
    const access = await sessions.access(hash, accessRoles);

    if (!access) {
        return {
            error: 'Доступ к ролям запрещен для данного пользователя',
            res: null,
        };
    }

    await deleteUser(userId);

    return {
        error: null,
        res: true,
    };
};
