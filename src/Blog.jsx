import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { setUser } from './actions';
import { Footer, Modal, StyledHeader } from './components';
import { Authorization, Main, Post, Registration, Users } from './pages';

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
    background-color: #f0f0f0;
    margin: 0 auto;
    padding-top: 80px;
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
    margin-top: 30px;
`;

function Blog() {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        const currentUserDataJSON = sessionStorage.getItem('userData');

        if (!currentUserDataJSON) {
            return;
        }

        const currentUserData = JSON.parse(currentUserDataJSON);

        dispatch(
            setUser({
                ...currentUserData,
                roleId: Number(currentUserData.roleId),
            })
        );
    }, [dispatch]);

    return (
        <>
            <GlobalStyle />
            <AppColumn>
                <StyledHeader />
                <Page>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/login" element={<Authorization />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/post/:id" element={<Post />} />
                        <Route path="/post" element={<Post />} />
                        <Route path="/post/:id/edit" element={<Post />} />
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
                <Modal />
            </AppColumn>
        </>
    );
}

export default Blog;
