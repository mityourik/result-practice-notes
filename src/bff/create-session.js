import { ROLE } from '../constants';
import { generateDate } from './generate-date';
import { removeComment } from './session/remove-comment';

const baseSessionActions = {
    logout() {
        Object.keys(this).forEach((key) => {
            delete this[key];
        });
    },
};

const rolePermissions = {
    [ROLE.ADMIN]: {
        ...baseSessionActions,
        removeComment,
        canModerate: true,
        canManageUsers: true,
    },
    [ROLE.MODERATOR]: {
        ...baseSessionActions,
        removeComment,
        canModerate: true,
    },
    [ROLE.USER]: {
        ...baseSessionActions,
    },
    [ROLE.GUEST]: {
        ...baseSessionActions,
    },
};

export const createSession = (roleId = ROLE.GUEST) => {
    if (!(roleId in rolePermissions)) {
        throw new Error('Некорректная роль пользователя');
    }

    return {
        ...rolePermissions[roleId],
        roleId,
        createdAt: generateDate(),
    };
};
