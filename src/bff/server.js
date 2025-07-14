import { addUser } from './add-user';
import { getUser } from './get-user';
import { sessions } from './sessions';

const formatError = (error) => ({
    error: error?.message || 'Неизвестная ошибка',
    res: null,
});

export const server = {
    async logout(session) {
        sessions.remove(session);
        return { error: null, res: 'Вы вышли из системы' };
    },

    async authorize(authLogin, authPassword) {
        console.log('authorize called', authLogin, authPassword);
        try {
            if (!authLogin || !authPassword) {
                throw new Error('Логин и пароль обязательны');
            }

            const user = await getUser(authLogin);

            if (!user) {
                throw new Error('Такого пользователя не существует');
            }

            if (authPassword !== user.password) {
                throw new Error('Неверный пароль');
            }

            const result = {
                id: user.id,
                login: user.login,
                roleId: user.role_id,
                session: sessions.create(user),
            };
            return { error: null, res: result };
        } catch (error) {
            return formatError(error);
        }
    },
    async register(regLogin, regPassword) {
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
    },
};
