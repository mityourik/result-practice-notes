import { CLOSE_MODAL } from './close-modal';

export const removePostAsync = (requestServer, postId) => (dispatch) => {
    return requestServer('removePost', postId).then((response) => {
        if (response.error) {
            console.error('Ошибка удаления поста:', response.error);
            return Promise.reject(response.error);
        } else {
            dispatch(CLOSE_MODAL);
            return response;
        }
    });
};
