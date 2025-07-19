import { addUser, getUser } from '../api';
import { sessions } from '../sessions';
import { formatError } from '../utils';

export const register = async (regLogin, regPassword) => {
    try {
        const existingUser = await getUser(regLogin);
        if (existingUser) {
            return {
                error: 'Пользователь с таким логином уже существует',
                res: null,
            };
        }

        await addUser(regLogin, regPassword);

        const newUser = await getUser(regLogin);

        const result = {
            id: newUser.id,
            login: newUser.login,
            roleId: newUser.role_id,
            session: sessions.create(newUser),
        };
        return { error: null, res: result };
    } catch (error) {
        return formatError(error);
    }
};
