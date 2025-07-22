import { API_CONFIG } from '../config.js';
import { transformUser } from '../transformers';

// export const getUser = async (loginToFind) => {
//     const response = await fetch(
//         `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}?login=${loginToFind}`
//     );
//     const users = await response.json();
//     const loadedUser = users[0];

//     if (!loadedUser) return null;

//     return {
//         id: loadedUser.id,
//         login: loadedUser.login,
//         password: loadedUser.password,
//         registeredAt: loadedUser.registered_at,
//         roleId: loadedUser.role_id,
//     };
// };

export const getUser = async (loginToFind) => {
    return fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}?login=${loginToFind}`
    )
        .then((loadedUser) => loadedUser.json())
        .then(([loadedUser]) => loadedUser && transformUser(loadedUser));
};
