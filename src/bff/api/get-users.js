import { API_CONFIG } from '../config';
import { transformUser } from '../transformers';

export const getUsers = async () => {
    return fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`)
        .then((loadedUsers) => loadedUsers.json())
        .then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser));
};
