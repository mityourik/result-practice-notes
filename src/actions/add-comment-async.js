import { setPostData } from './set-post-data';

export const addCommentAsync =
    (requestServer, postId, userId, content) => (dispatch) => {
        requestServer('addPostComment', postId, userId, content).then(
            (postData) => {
                if (postData.error) {
                    console.error(
                        'Ошибка добавления комментария:',
                        postData.error
                    );
                } else {
                    dispatch(setPostData(postData.res));
                }
            }
        );
    };
