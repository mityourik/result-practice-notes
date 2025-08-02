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
            <div className="post-list">
                {posts.map(
                    ({ id, title, publishedAt, commentsCount, imageUrl }) => (
                        <PostCard
                            id={id}
                            imageUrl={imageUrl}
                            key={id}
                            title={title}
                            publishedAt={publishedAt}
                            commentsCount={commentsCount}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export const Main = styled(MainContainer)`
    & .post-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
        padding: 10px;
    }
`;
