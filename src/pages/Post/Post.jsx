import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { useServerRequest } from '../../hooks';
import { selectPost } from '../../selectors';
import { Comments, PostContent, PostForm } from './components';

const emptyPost = {
    id: '',
    title: '',
    imageUrl: '',
    content: '',
    publishedAt: '',
    comments: [],
};

const PostContainer = ({ className }) => {
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
            return;
        }
        dispatch(loadPostAsync(requestServer, params.id));
    }, [dispatch, requestServer, params.id, isCreating]);

    return (
        <div className={className}>
            {isEditing || isCreating ? (
                <PostForm post={isCreating ? emptyPost : post} />
            ) : (
                <>
                    <PostContent post={post} />
                    <Comments comments={post.comments} postId={post.id} />
                </>
            )}
        </div>
    );
};

export const Post = styled(PostContainer)`
    padding: 0 80px 0 80px;
`;
