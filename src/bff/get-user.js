import { API_CONFIG } from './config.js';

export const getUser = async (loginToFind) => {
    const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}?login=${loginToFind}`
    );
    const users = await response.json();
    return Array.isArray(users) ? users[0] : null;
};
