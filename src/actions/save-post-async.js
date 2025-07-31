import { setPostData } from './set-post-data';

export const savePostAsync = (requestServer, postData) => (dispatch) => {
    return requestServer('savePost', postData).then((response) => {
        if (response.error) {
            console.error('Ошибка сохранения поста:', response.error);
        } else {
            dispatch(setPostData(response.res));
        }
        return response;
    });
};
