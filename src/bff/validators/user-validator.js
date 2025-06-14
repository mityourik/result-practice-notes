import { AppError, ErrorTypes } from '../error-types';

const PASSWORD_MIN_LENGTH = 6;
const LOGIN_MIN_LENGTH = 3;

/**
 * Валидация данных пользователя
 */
export class UserValidator {
    /**
     * Проверяет логин пользователя
     */
    static validateLogin(login) {
        if (!login || typeof login !== 'string') {
            throw new AppError(ErrorTypes.VALIDATION_ERROR, 'Логин обязателен');
        }

        if (login.length < LOGIN_MIN_LENGTH) {
            throw new AppError(
                ErrorTypes.VALIDATION_ERROR,
                `Логин должен содержать минимум ${LOGIN_MIN_LENGTH} символа`
            );
        }

        if (!/^[a-zA-Z0-9_]+$/.test(login)) {
            throw new AppError(
                ErrorTypes.VALIDATION_ERROR,
                'Логин может содержать только буквы, цифры и знак подчеркивания'
            );
        }
    }

    /**
     * Проверяет пароль пользователя
     */
    static validatePassword(password) {
        if (!password || typeof password !== 'string') {
            throw new AppError(
                ErrorTypes.VALIDATION_ERROR,
                'Пароль обязателен'
            );
        }

        if (password.length < PASSWORD_MIN_LENGTH) {
            throw new AppError(
                ErrorTypes.VALIDATION_ERROR,
                `Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов`
            );
        }

        if (!/[A-Z]/.test(password)) {
            throw new AppError(
                ErrorTypes.VALIDATION_ERROR,
                'Пароль должен содержать хотя бы одну заглавную букву'
            );
        }

        if (!/[0-9]/.test(password)) {
            throw new AppError(
                ErrorTypes.VALIDATION_ERROR,
                'Пароль должен содержать хотя бы одну цифру'
            );
        }
    }

    /**
     * Проверяет данные пользователя
     */
    static validateUserData(login, password) {
        this.validateLogin(login);
        this.validatePassword(password);
    }
}
