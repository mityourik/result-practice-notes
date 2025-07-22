import { API_CONFIG } from '../config';

export const deleteUser = async (userId) => {
    await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${userId}`,
        {
            method: 'DELETE',
        }
    );
};
