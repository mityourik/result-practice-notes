import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
    text-align: center;
`;

const Content = styled.div`
    padding: 20px;
    width: 100%;
`;

const H2 = styled.h2`
    text-align: center;
`;

const Header = styled.header`
    width: 100%;
    padding: 20px;
    text-align: center;
`;

const Footer = styled.footer`
    width: 100%;
    padding: 20px;
    text-align: center;
`;

function Blog() {
    return (
        <>
            <Header>Хедер блога</Header>
            <Content>
                <H2>Контент блога</H2>
                <Routes>
                    <Route path="/" element={<Div>Главная страница</Div>} />
                    <Route path="/login" element={<Div>Авторизация</Div>} />
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
            <Footer>Футер блога</Footer>
        </>
    );
}

export default Blog;
