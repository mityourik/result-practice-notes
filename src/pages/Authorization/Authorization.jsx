import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { setUser } from '../../actions';
import { server } from '../../bff';
import { useResetForm } from '../../hooks';
import { AuthFormError, Button, H2, Input } from '../../components';
import { ROLE } from '../../constants';

const authFormSchema = yup.object().shape({
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
        .min(3, 'Пароль должен содержать минимум 6 символов')
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

const AuthorizationContainer = ({ className }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            login: '',
            password: '',
        },
        resolver: yupResolver(authFormSchema),
        mode: 'onChange',
    });

    const [serverError, setServerError] = useState(null);

    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);

    useResetForm(reset);

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }
            setServerError(null);
            dispatch(setUser(res));
            sessionStorage.setItem('userData', JSON.stringify(res));
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;
    const errorMessage = serverError || formError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" replace />;
    }

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
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

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
