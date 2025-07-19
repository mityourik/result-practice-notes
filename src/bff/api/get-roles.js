import { API_CONFIG } from '../config';

export const getRoles = async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/roles`);
    if (!response.ok) {
        throw new Error('Не удалось загрузить роли');
    }
    return response.json();
};
