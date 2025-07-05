import { API_CONFIG } from './config';
import { AppError, ErrorTypes } from './error-types';

export const getUsers = async () => {
    try {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`
        );
        if (!response.ok) {
            throw new AppError(
                ErrorTypes.CONNECTION_ERROR,
                `Ошибка загрузки пользователей: ${response.status}`
            );
        }
        const users = await response.json();
        return users;
    } catch {
        throw new AppError(
            ErrorTypes.CONNECTION_ERROR,
            'Ошибка при получении пользователей'
        );
    }
};

export const getUser = async (loginToFind) => {
    try {
        if (!loginToFind || typeof loginToFind !== 'string') {
            throw new AppError(
                ErrorTypes.VALIDATION_ERROR,
                'Некорректный логин для поиска'
            );
        }

        const users = await getUsers();
        if (!Array.isArray(users)) {
            throw new AppError(
                ErrorTypes.CONNECTION_ERROR,
                'Ошибка получения списка пользователей'
            );
        }

        const user = users.find(({ login }) => login === loginToFind);
        if (!user) {
            throw new AppError(ErrorTypes.NOT_FOUND, 'Пользователь не найден');
        }
        return user;
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
