import { getUser } from '../api';
import { sessions } from '../sessions';
import { formatError } from '../utils';

export const authorize = async (authLogin, authPassword) => {
    try {
        if (!authLogin || !authPassword) {
            throw new Error('Логин и пароль обязательны');
        }

        const user = await getUser(authLogin);

        if (!user) {
            throw new Error('Такого пользователя не существует');
        }

        const { id, login, password, roleId } = user;

        if (authPassword !== password) {
            throw new Error('Неверный пароль');
        }

        const result = {
            id,
            login,
            roleId,
            session: sessions.create(user),
        };
        return { error: null, res: result };
    } catch (error) {
        return formatError(error);
    }
};
