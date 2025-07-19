import { sessions } from '../sessions';

export const logout = async (session) => {
    sessions.remove(session);
    return { error: null, res: 'Вы вышли из системы' };
};
