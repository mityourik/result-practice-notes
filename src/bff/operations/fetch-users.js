import { getUsers } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { formatError } from '../utils';

export const fetchUsers = async (userSession) => {
    try {
        const accessRoles = [ROLE.ADMIN];

        if (!sessions.access(userSession, accessRoles)) {
            return {
                error: 'Доступ к ролям запрещен для данного пользователя',
                res: null,
            };
        }

        const users = await getUsers();

        if (!users) {
            return {
                error: 'Ошибка получения списка пользователей',
                res: [],
            };
        }

        return { error: null, res: users };
    } catch (error) {
        return formatError(error);
    }
};
