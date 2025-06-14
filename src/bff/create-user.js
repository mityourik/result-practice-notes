import { API_CONFIG } from './config';
import { getUser } from './get-user';
import { generateDate } from './generate-date';
import { createSession } from './create-session';

const sendCreateUserRequest = async (userData) => {
    const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        }
    );

    if (!response.ok) {
        const message = await response
            .text()
            .catch(() => 'Ошибка при создании пользователя');
        throw new Error(message);
    }

    return response.json();
};

export const createUser = async (login, password) => {
    try {
        const existingUser = await getUser(login);

        if (existingUser) {
            return {
                error: 'Такой пользователь уже существует',
                res: null,
            };
        }

        const userData = {
            login,
            password,
            registered_at: generateDate(),
            role_id: 2,
        };

        await sendCreateUserRequest(userData);

        return {
            error: null,
            res: createSession(userData.role_id),
        };
    } catch (err) {
        return {
            error: `Ошибка при создании пользователя: ${err.message}`,
            res: null,
        };
    }
};
