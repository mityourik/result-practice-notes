import styled from 'styled-components';
import { useGithubLastCommit } from '../../hooks/useGithubLastCommit';

const FooterContainer = styled.footer`
    padding: 10px;
    background: #f5f5f5;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ArticleLink = styled.a`
    color: #222;
    font-weight: 600;
    font-size: 0.5em;
    text-decoration: none;
    margin-bottom: 6px;
    text-align: left;
    &:hover {
        color: #3498db;
        text-decoration: none;
    }
`;

const ArticleDate = styled.div`
    color: #7f8c8d;
    font-size: 0.5em;
`;

const Message = styled.div`
    color: #7f8c8d;
    padding: 14px 0;
`;

const Title = styled.h3`
    color: #111;
    font-size: 0.6em;
    font-weight: 700;
    margin: 0 0 8px 0;
    text-transform: uppercase;
`;

const NewsBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: none;
    max-width: 40%;
`;

const ActivityBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    max-width: 50%;
`;

const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background: none;
    max-width: 60%;
`;

const GithubHeatmap = styled.img`
    width: 100%;
`;

export const Footer = () => {
    const GITHUB_USERNAME = 'mityourik';
    const { commit, isLoading } = useGithubLastCommit(GITHUB_USERNAME);

    return (
        <FooterContainer>
            <NewsBlock>
                {isLoading ? (
                    <Message>Loading...</Message>
                ) : !commit ? (
                    <Message>Нет публичных коммитов</Message>
                ) : (
                    <>
                        <Title>My last commit on GitHub:</Title>
                        <ArticleLink
                            href={commit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {commit.message}
                        </ArticleLink>
                        <ArticleDate>
                            {commit.repo} —{' '}
                            {new Date(commit.date).toLocaleDateString()}
                        </ArticleDate>
                    </>
                )}
            </NewsBlock>
            <ActivityBlock>
                <GithubHeatmap
                    src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                    alt="GitHub Contributions Heatmap"
                />
            </ActivityBlock>
            <InfoBlock>
                <Title>Информация</Title>
            </InfoBlock>
        </FooterContainer>
    );
};
