import { API_CONFIG } from '../config';

export const addSession = async (hash, user) => {
    try {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SESSIONS}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    hash,
                    user,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.error || data?.message || 'Не удалось добавить сессию'
            );
        }

        return data;
    } catch (err) {
        throw new Error(
            err?.error || err?.message || 'Ошибка при добавлении сессии'
        );
    }
};
