import { fetchUsers } from './get-users.js';

export const getUser = async (loginToFind) => {
    const users = await fetchUsers();

    return users.find(({ login }) => login === loginToFind);
};
