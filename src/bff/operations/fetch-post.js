import { getPost } from '../api';
import { formatError, getPostCommentsWithAuthor } from '../utils';

export const fetchPost = async (postId) => {
    let post;
    let error;

    try {
        post = await getPost(postId);
    } catch (postError) {
        error = postError;
    }

    if (error) {
        return { error: formatError(error), res: null };
    }

    const commentsWithAuthors = await getPostCommentsWithAuthor(postId);

    return { error: null, res: { ...post, comments: commentsWithAuthors } };
};
