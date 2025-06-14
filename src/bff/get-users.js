import { API_CONFIG } from './config';

export const getUsers = () => {
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`).then(
        (loadedUsers) => loadedUsers.json()
    );
};
