import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PAGINATION_LIMIT } from '../../constants';
import { useDebounce, useServerRequest } from '../../hooks';
import { Pagination, PostCard, Search } from './components';

const MainContainer = ({ className }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [searchPhrase, setSearchPhrase] = useState('');

    const requestServer = useServerRequest();

    const debouncedLoadPosts = useDebounce((searchTerm, currentPage) => {
        let requestPromise;
        if (searchTerm && searchTerm.trim()) {
            requestPromise = requestServer(
                'searchPosts',
                searchTerm,
                currentPage,
                PAGINATION_LIMIT
            );
        } else {
            requestPromise = requestServer(
                'fetchPosts',
                currentPage,
                PAGINATION_LIMIT
            );
        }

        requestPromise
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
    }, 500);

    useEffect(() => {
        debouncedLoadPosts(searchPhrase, page);
    }, [debouncedLoadPosts, searchPhrase, page]);

    const onSearch = ({ target }) => {
        setSearchPhrase(target.value);
        setPage(1);
    };

    const onPageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className={className}>
            <Search onChange={onSearch} searchPhrase={searchPhrase} />
            {posts.length > 0 ? (
                <div className="post-list">
                    {posts.map(
                        ({
                            id,
                            title,
                            publishedAt,
                            commentsCount,
                            imageUrl,
                        }) => (
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
            ) : (
                <div className="no-posts">... посты не найдены</div>
            )}
            {lastPage > 1 && (
                <Pagination
                    page={page}
                    setPage={onPageChange}
                    lastPage={lastPage}
                />
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

    & .no-posts {
        text-align: center;
        padding: 40px 20px;
        font-size: 18px;
        color: #666;
        border-radius: 8px;
        margin: 20px;
        height: calc(100vh - 359px);
    }
`;
