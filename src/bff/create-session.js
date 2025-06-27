import { ROLE } from '../constants';
import { AppError, ErrorTypes } from './error-types';
import { removeComment } from './session/remove-comment';
import { generateDate } from './generate-date';

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

/**
 * Создает сессию пользователя с соответствующими правами доступа
 * @param {number} roleId - ID роли пользователя из констант ROLE
 * @returns {Object} Объект сессии с правами доступа
 * @throws {AppError} Если роль пользователя некорректна
 */
export const createSession = (roleId = ROLE.GUEST) => {
    if (!(roleId in rolePermissions)) {
        throw new AppError(
            ErrorTypes.VALIDATION_ERROR,
            'Некорректная роль пользователя'
        );
    }

    return {
        ...rolePermissions[roleId],
        roleId,
        createdAt: generateDate(),
    };
};
