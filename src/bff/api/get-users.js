import { API_CONFIG } from '../config';
import { transformUser } from '../transformers';

// export const getUsers = async () => {
//     const response = await fetch(
//         `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`
//     );
//     const users = await response.json();

//     return users.map((user) => ({
//         id: user.id,
//         login: user.login,
//         registeredAt: user.registered_at,
//         roleId: user.role_id,
//     }));
// };

export const getUsers = async () => {
    return fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`)
        .then((loadedUsers) => loadedUsers.json())
        .then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser));
};
