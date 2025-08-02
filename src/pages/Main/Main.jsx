import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { PostCard } from './components';

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);

    const requestServer = useServerRequest();

    useEffect(() => {
        requestServer('fetchPosts').then(async (postsRes) => {
            setPosts(postsRes.res || []);
        });
    }, [requestServer]);

    return (
        <div className={className}>
            {posts.map(({ id, title, publishedAt, commentsCount }) => (
                <PostCard
                    key={id}
                    title={title}
                    publishedAt={publishedAt}
                    commentsCount={commentsCount}
                />
            ))}
        </div>
    );
};

export const Main = styled(MainContainer)``;
