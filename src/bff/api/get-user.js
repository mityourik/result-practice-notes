import { API_CONFIG } from '../config.js';

export const getUser = async (loginToFind) => {
    const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}?login=${loginToFind}`
    );
    const users = await response.json();
    const loadedUser = users[0];

    if (!loadedUser) return null;

    return {
        id: loadedUser.id,
        login: loadedUser.login,
        password: loadedUser.password,
        registeredAt: loadedUser.registered_at,
        roleId: loadedUser.role_id,
    };
};
