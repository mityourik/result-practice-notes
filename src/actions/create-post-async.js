import { setPostData } from './set-post-data';

export const createPostAsync = (requestServer, postData) => (dispatch) => {
    return requestServer('createPost', postData).then((response) => {
        if (response.error) {
            console.error('Ошибка создания поста:', response.error);
            return response;
        } else {
            dispatch(setPostData(response.res));
            return response;
        }
    });
};
