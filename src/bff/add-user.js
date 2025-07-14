import { API_CONFIG } from './config';
import { generateDate } from './generate-date';

export const addUser = async (login, password) => {
    try {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    login,
                    password,
                    registered_at: generateDate(),
                    role_id: 2,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.error || data?.message || 'Ошибка создания пользователя'
            );
        }

        return data;
    } catch (err) {
        throw new Error(
            err?.error || err?.message || 'Ошибка при добавлении пользователя'
        );
    }
};
