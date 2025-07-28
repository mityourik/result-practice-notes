import { API_CONFIG } from '../config.js';
import { transformUser } from '../transformers';

export const getUser = async (loginToFind) => {
    return fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}?login=${loginToFind}`
    )
        .then((loadedUser) => loadedUser.json())
        .then(([loadedUser]) => loadedUser && transformUser(loadedUser));
};
