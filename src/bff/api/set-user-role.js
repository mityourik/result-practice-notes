import { API_CONFIG } from '../config';

export const setUserRole = async (userId, roleId) => {
    try {
        const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${userId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    role_id: roleId,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data?.error ||
                    data?.message ||
                    'Ошибка изменения роли пользователя'
            );
        }

        return data;
    } catch (err) {
        throw new Error(
            err?.error ||
                err?.message ||
                'Ошибка при изменении роли пользователя'
        );
    }
};
