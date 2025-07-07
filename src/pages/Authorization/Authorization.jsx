import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { setUser } from '../../actions';
import { server } from '../../bff';
import { Button, H2, Input } from '../../components';

const authFromSchema = yup.object().shape({
    login: yup
        .string()
        .min(3, 'Логин должен содержать минимум 3 символа')
        .max(15, 'Логин не должен превышать 15 символов')
        .required('Логин обязателен')
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'Логин может содержать только буквы, цифры и знак подчеркивания'
        ),
    password: yup
        .string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .max(20, 'Пароль не должен превышать 20 символов')
        .required('Пароль обязателен')
        .matches(
            /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
            'Пароль должен содержать хотя бы одну заглавную букву и одну цифру'
        ),
});

const LinkForAuth = styled(Link)`
    text-decoration: none;
    color: rgb(100, 100, 200);
    font-size: 0.9em;
    text-align: center;
    margin: 15px 0 0 0;

    &:hover {
        color: rgb(50, 50, 150);
    }
`;

const ErrorMessage = styled.div`
    font-size: 0.8em;
    margin-top: 10px;
    text-align: center;
    background-color: #fcadad;
    border-radius: 2px;
    padding: 4px;
`;

const AuthorizationContainer = ({ className }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            login: '',
            password: '',
        },
        resolver: yupResolver(authFromSchema),
        mode: 'onChange',
    });

    const [serverError, setServerError] = useState(null);

    const dispatch = useDispatch();

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }
            setServerError(null);
            dispatch(setUser(res));
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;
    const errorMessage = serverError || formError;

    return (
        <div className={className}>
            <H2>Авторизация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Логин..."
                    {...register('login')}
                />
                <Input
                    type="password"
                    placeholder="Пароль..."
                    {...register('password')}
                />
                <Button type="submit" disabled={!isValid}>
                    авторизоваться
                </Button>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

                <LinkForAuth to="/register">
                    {' '}
                    или
                    <br />
                    зарегистрироваться
                </LinkForAuth>
            </form>
        </div>
    );
};

export const Authorization = styled(AuthorizationContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`;
