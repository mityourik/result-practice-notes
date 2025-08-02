import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PAGINATION_LIMIT } from '../../constants';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard } from './components';

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const requestServer = useServerRequest();

    useEffect(() => {
        requestServer('fetchPosts', page, PAGINATION_LIMIT)
            .then(({ error, res }) => {
                if (error) {
                    console.error('Ошибка загрузки постов:', error);
                    setPosts([]);
                    setLastPage(1);
                    return;
                }

                if (!res) {
                    console.warn('Получен пустой ответ от сервера');
                    setPosts([]);
                    setLastPage(1);
                    return;
                }

                const { posts, lastPage } = res;
                setPosts(posts || []);
                setLastPage(lastPage || 1);
            })
            .catch((error) => {
                console.error('Ошибка при запросе постов:', error);
                setPosts([]);
                setLastPage(1);
            });
    }, [requestServer, page]);

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
            {lastPage > 1 && (
                <Pagination page={page} setPage={setPage} lastPage={lastPage} />
            )}
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
