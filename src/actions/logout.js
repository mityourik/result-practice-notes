import { server } from '../bff';
import { ACTION_TYPE } from './action-type';

export const logout = (session) => {
    server.logout(session);

    sessionStorage.removeItem('userData');

    return {
        type: ACTION_TYPE.LOGOUT,
    };
};
