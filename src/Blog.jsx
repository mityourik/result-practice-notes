import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { StyledHeader } from './components';
import { Authorization } from './pages';
import { Footer } from './components';

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 75%;
    height: 100%;
    background-color: #f0f0f0;
    margin: 0 auto;
`;

const Div = styled.div`
    text-align: center;
    color: #333;
    font-size: 1.2em;
`;

const Content = styled.div`
    padding: 20px;
    width: 100%;
`;

const H2 = styled.h2`
    text-align: center;
    color: #333;
`;

function Blog() {
    return (
        <AppColumn>
            <StyledHeader />
            <Content>
                <H2>Контент блога</H2>
                <Routes>
                    <Route path="/" element={<Div>Главная страница</Div>} />
                    <Route path="/login" element={<Authorization />} />
                    <Route path="/register" element={<Div>Регистрация</Div>} />
                    <Route
                        path="/users"
                        element={<Div>Список пользователей</Div>}
                    />
                    <Route path="/post/:postId" element={<Div>Пост</Div>} />
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
            </Content>
            <Footer />
        </AppColumn>
    );
}

export default Blog;
