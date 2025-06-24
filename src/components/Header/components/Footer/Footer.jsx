import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDevToArticles } from '../../services/devto-service';

const FooterContainer = styled.footer`
    padding: 20px;
    background-color: #f5f5f5;
    margin-top: auto;
`;

const ArticlesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
`;

const ArticleItem = styled.li`
    padding: 15px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-2px);
    }
`;

const ArticleLink = styled.a`
    color: #2c3e50;
    text-decoration: none;
    font-weight: 500;

    &:hover {
        color: #3498db;
    }
`;

const ArticleDate = styled.span`
    color: #7f8c8d;
    font-size: 0.9em;
    display: block;
    margin-top: 8px;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: #7f8c8d;
`;

export const Footer = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await getDevToArticles();
            setArticles(data);
            setIsLoading(false);
        };

        fetchArticles();
    }, []);

    if (isLoading) {
        return (
            <FooterContainer>
                <LoadingMessage>Loading latest articles...</LoadingMessage>
            </FooterContainer>
        );
    }

    return (
        <FooterContainer>
            <h3>Latest Dev.to Articles</h3>
            <ArticlesList>
                {articles.map((article) => (
                    <ArticleItem key={article.id}>
                        <ArticleLink
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {article.title}
                        </ArticleLink>
                        <ArticleDate>
                            {new Date(
                                article.published_at
                            ).toLocaleDateString()}
                        </ArticleDate>
                    </ArticleItem>
                ))}
            </ArticlesList>
        </FooterContainer>
    );
};
