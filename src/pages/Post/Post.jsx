import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { useServerRequest } from '../../hooks';
import { selectPost } from '../../selectors';
import { Comments, PostContent, PostForm } from './components';
import { Error } from '../../components';

const emptyPost = {
    id: '',
    title: '',
    imageUrl: '',
    content: '',
    publishedAt: '',
    comments: [],
};

const PostContainer = ({ className }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const params = useParams();
    const isCreating = useMatch('/post');
    const isEditing = useMatch('/post/:id/edit');
    const requestServer = useServerRequest();
    const post = useSelector(selectPost);

    useLayoutEffect(() => {
        if (!isCreating) {
            dispatch(RESET_POST_DATA);
        }
    }, [dispatch, isCreating]);

    useEffect(() => {
        if (isCreating) {
            setIsLoading(false);
            return;
        }
        dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
            setError(postData.error);
            setIsLoading(false);
        });
    }, [dispatch, requestServer, params.id, isCreating]);

    if (isLoading) {
        return <div className={className}>Loading...</div>;
    }

    return (
        <div className={className}>
            {error ? (
                <Error error={error} />
            ) : (
                <>
                    {isEditing || isCreating ? (
                        <PostForm post={isCreating ? emptyPost : post} />
                    ) : (
                        <>
                            <PostContent post={post} />
                            <Comments
                                comments={post.comments}
                                postId={post.id}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export const Post = styled(PostContainer)`
    padding: 0 80px 0 80px;
    height: calc(100vh - 199px);

    & .error-message {
        background-color: #fee;
        border: 1px solid #fcc;
        border-radius: 4px;
        color: #c33;
        padding: 15px;
        margin: 20px 0;
        text-align: center;
        font-size: 16px;
    }
`;
