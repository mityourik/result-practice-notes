import { API_CONFIG } from '../config.js';

export const getUser = async (loginToFind) => {
    fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}?login=${loginToFind}`
    )
        .then((loadedUser) => loadedUser.json())
        .then(
            ([loadedUser]) =>
                loadedUser && {
                    id: loadedUser.id,
                    login: loadedUser.login,
                    password: loadedUser.password,
                    registeredAt: loadedUser.registered_at,
                    roleId: loadedUser.role_id,
                }
        );
};
