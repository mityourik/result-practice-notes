import { setPostData } from './set-post-data';

export const removeCommentAsync =
    (requestServer, postId, commentId) => (dispatch) => {
        requestServer('removeComment', postId, commentId).then((postData) => {
            if (postData.error) {
                console.error('Ошибка удаления комментария:', postData.error);
            } else {
                dispatch(setPostData(postData.res));
            }
        });
    };
