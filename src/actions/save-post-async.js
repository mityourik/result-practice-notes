export const savePostAsync = (requestServer, newPostData) => () =>
    requestServer('savePost', newPostData);
