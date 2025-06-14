import { AppError, ErrorTypes } from './error-types';
import { fetchUsers } from './get-users.js';

export const getUser = async (loginToFind) => {
    try {
        if (!loginToFind || typeof loginToFind !== 'string') {
            throw new AppError(
                ErrorTypes.VALIDATION_ERROR,
                'Некорректный логин для поиска'
            );
        }

        const users = await fetchUsers();
        if (!Array.isArray(users)) {
            throw new AppError(
                ErrorTypes.CONNECTION_ERROR,
                'Ошибка получения списка пользователей'
            );
        }

        return users.find(({ login }) => login === loginToFind);
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(
            ErrorTypes.CONNECTION_ERROR,
            'Ошибка при поиске пользователя'
        );
    }
};
