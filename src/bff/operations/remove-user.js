import { deleteUser } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeUser = async (userSession, userId) => {
    const accessRoles = [ROLE.ADMIN];
    if (!sessions.access(userSession, accessRoles)) {
        return {
            error: 'Доступ к удалению пользователей запрещен для данного пользователя',
            res: null,
        };
    }

    await deleteUser(userId);

    return {
        error: null,
        res: true,
    };
};
