import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import styled from 'styled-components';

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

const AuthorizationContainer = ({ className }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: '',
            password: '',
        },
        resolver: yupResolver(authFromSchema),
    });

    const [serverError, setServerError] = useState(null);

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
            } else {
                console.log('Успешная авторизация:', res);
            }
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;
    const errorMessage = serverError || formError;

    return (
        <div className={className}>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Логин..."
                    {...register('login')}
                />
                <input
                    type="password"
                    placeholder="Пароль..."
                    {...register('password')}
                />
                <button type="submit" disabled={!!formError}>
                    Войти
                </button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export const Authorization = styled(AuthorizationContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
