import { addUser } from './add-user';
import { AppError, ErrorTypes } from './error-types';
import { getUser } from './get-user';
import { sessions } from './sessions';

/**
 * Преобразует ошибку в стандартный формат ответа
 * @param {Error} error - Исходная ошибка
 * @returns {Object} Объект с форматированной ошибкой
 */
const formatError = (error) => ({
    error: error instanceof AppError ? error.message : 'Неизвестная ошибка',
    res: null,
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

            const result = {
                id: user.id,
                login: user.login,
                roleId: user.role_id,
                session: sessions.create(user),
            };
            return { error: null, res: result };
        } catch (error) {
            return formatError(error);
        }
    },
    async register(regLogin, regPassword) {
        try {
            const user = await getUser(regLogin);

            if (user) {
                return {
                    error: 'Пользователь с таким логином уже существует',
                    res: null,
                };
            }

            await addUser(regLogin, regPassword);

            const newUser = await getUser(regLogin);

            const result = {
                id: newUser.id,
                login: newUser.login,
                roleId: newUser.role_id,
                session: sessions.create(newUser),
            };
            return { error: null, res: result };
        } catch (error) {
            return formatError(error);
        }
    },
};
