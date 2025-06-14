import { createSession } from './create-session';
import { createUser } from './create-user';
import { AppError, ErrorTypes } from './error-types';
import { getUser } from './get-user';

/**
 * Преобразует ошибку в стандартный формат ответа
 * @param {Error} error - Исходная ошибка
 * @returns {Object} Объект с форматированной ошибкой
 */
const formatError = (error) => ({
    error: error instanceof AppError ? error.message : 'Неизвестная ошибка',
    res: null,
});

/**
 * Форматирует успешный ответ с данными сессии
 * @param {Object} session - Объект сессии
 * @returns {Object} Отформатированный ответ
 */
const formatSuccess = (session) => ({
    error: null,
    res: session,
});

export const server = {
    async authorize(authLogin, authPassword) {
        try {
            if (!authLogin || !authPassword) {
                throw new AppError(
                    ErrorTypes.VALIDATION_ERROR,
                    'Логин и пароль обязательны'
                );
            }

            const user = await getUser(authLogin);

            if (!user) {
                throw new AppError(
                    ErrorTypes.USER_NOT_FOUND,
                    'Такого пользователя не существует'
                );
            }

            if (authPassword !== user.password) {
                throw new AppError(
                    ErrorTypes.INVALID_PASSWORD,
                    'Неверный пароль'
                );
            }

            const session = createSession(user.role_id);
            return formatSuccess(session);
        } catch (error) {
            return formatError(error);
        }
    },

    async register(regLogin, regPassword) {
        try {
            if (!regLogin || !regPassword) {
                throw new AppError(
                    ErrorTypes.VALIDATION_ERROR,
                    'Логин и пароль обязательны'
                );
            }

            const result = await createUser(regLogin, regPassword);
            return result;
        } catch (error) {
            return formatError(error);
        }
    },
};
