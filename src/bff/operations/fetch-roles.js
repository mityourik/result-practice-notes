import { ROLE } from '../constants';
import { getRoles } from '../api';
import { sessions } from '../sessions';
import { formatError } from '../utils';

export const fetchRoles = async (userSession) => {
    try {
        const accessRoles = [ROLE.ADMIN];

        if (!sessions.access(userSession, accessRoles)) {
            return {
                error: 'Доступ к ролям запрещен для данного пользователя',
                res: null,
            };
        }

        const roles = getRoles();

        return { error: null, res: roles };
    } catch (error) {
        return formatError(error);
    }
};
