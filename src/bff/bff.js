import { createUser } from './create-user';
import { getUser } from './get-user';
import { createSession } from './create-session';

export const server = {
    async authorize(authLogin, authPassword) {
        const users = await getUser(authLogin);

        if (!users) {
            return {
                error: 'Такого юзера не существует',
                res: null,
            };
        }

        if (authPassword !== users.password) {
            return {
                error: 'Неверный пароль',
                res: null,
            };
        }

        return {
            error: null,
            res: createSession(users.role_id),
        };
    },

    async register(regLogin, regPassword) {
        return await createUser(regLogin, regPassword);
    },
};
