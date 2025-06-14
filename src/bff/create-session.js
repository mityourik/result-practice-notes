import { removeComment } from './session';
import { ROLE } from '../constants';

export const createSession = (roleId) => {
    const session = {
        logout() {
            Object.keys(this).forEach((key) => {
                delete this[key];
            });
        },
    };

    switch (roleId) {
        case ROLE.ADMIN:
            {
                session.removeComment = removeComment;
            }
            break;
        case ROLE.MODERATOR:
            {
                session.removeComment = removeComment;
            }
            break;
        case ROLE.USER:
            break;
        default:
            ROLE.GUEST;
    }

    return {
        roleId: roleId || 'guest',
    };
};
