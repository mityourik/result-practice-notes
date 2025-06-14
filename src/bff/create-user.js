import { ROLE } from '../constants/role';
import { API_CONFIG } from './config';
import { createSession } from './create-session';
import { AppError, ErrorTypes } from './error-types';
import { generateDate } from './generate-date';
import { getUser } from './get-user';

const validateUserData = (login, password) => {
    if (!login || typeof login !== 'string' || login.length < 3) {
        throw new AppError(
            ErrorTypes.VALIDATION_ERROR,
            'Логин должен содержать минимум 3 символа'
        );
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        throw new AppError(
            ErrorTypes.VALIDATION_ERROR,
            'Пароль должен содержать минимум 6 символов'
        );
    }
};

const sendCreateUserRequest = async (userData) => {
    try {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(userData),
            }
        );

        if (!response.ok) {
            const errorData = await response
                .json()
                .catch(() => ({ message: 'Ошибка при создании пользователя' }));

            throw new AppError(ErrorTypes.CREATION_ERROR, errorData.message);
        }

        return response.json();
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(
            ErrorTypes.CONNECTION_ERROR,
            'Ошибка соединения с сервером'
        );
    }
};

export const createUser = async (login, password) => {
    try {
        validateUserData(login, password);

        const existingUser = await getUser(login);
        if (existingUser) {
            throw new AppError(
                ErrorTypes.USER_EXISTS,
                'Такой пользователь уже существует'
            );
        }

        const userData = {
            login,
            password,
            registered_at: generateDate(),
            role_id: ROLE.USER,
        };

        await sendCreateUserRequest(userData);

        return {
            error: null,
            res: createSession(userData.role_id),
        };
    } catch (err) {
        return {
            error: err.message,
            res: null,
        };
    }
};
