import { Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Footer, StyledHeader } from './components';
import { Authorization, Registration, Users, Post } from './pages';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #5f7d9d;
    margin: 0;
    min-height: 100vh;
  }
`;

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    background-color: #f0f0f0;
    margin: 0 auto;
    padding-top: 100px;
    max-width: 900px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
    border-radius: 10px;
`;

const Div = styled.div`
    text-align: center;
    color: #333;
    font-size: 1.2em;
    margin: 0 0 10px 0;
`;

const Page = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

function Blog() {
    return (
        <>
            <GlobalStyle />
            <AppColumn>
                <StyledHeader />
                <Page>
                    <Routes>
                        <Route path="/" element={<Div>Главная страница</Div>} />
                        <Route path="/login" element={<Authorization />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/post/:id" element={<Post />} />
                        <Route path="/post" element={<Div>Пост</Div>} />
                        <Route
                            path="*"
                            element={
                                <Div>404 - Страница не найдена</Div> || (
                                    <Div>Ошибка</Div>
                                )
                            }
                        />
                    </Routes>
                </Page>
                <Footer />
            </AppColumn>
        </>
    );
}

export default Blog;
