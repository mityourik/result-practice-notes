import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { loadPostAsync } from '../../actions';
import { useServerRequest } from '../../hooks';
import { selectPost } from '../../selectors';
import { Comments, PostContent } from './components';

const PostContainer = ({ className }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const requestServer = useServerRequest();
    const post = useSelector(selectPost);

    useEffect(() => {
        dispatch(loadPostAsync(requestServer, params.id));
    }, [dispatch, requestServer, params.id]);

    return (
        <div className={className}>
            <PostContent post={post} />
            <Comments comments={post.comments} postId={post.id} />
        </div>
    );
};

export const Post = styled(PostContainer)`
    padding: 0 80px 0 80px;
`;
