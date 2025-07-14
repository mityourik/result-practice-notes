import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { setUser } from '../../actions';
import { server } from '../../bff';
import { Button, H2, Input } from '../../components';
import { ROLE } from '../../constants';

const regFormSchema = yup.object().shape({
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
    passcheck: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
        .required('Подтверждение пароля обязательно'),
});

const ErrorMessage = styled.div`
    font-size: 0.8em;
    margin-top: 10px;
    text-align: center;
    background-color: #fcadad;
    border-radius: 2px;
    padding: 4px;
`;

const RegistrationContainer = ({ className }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            login: '',
            password: '',
            passcheck: '',
        },
        resolver: yupResolver(regFormSchema),
        mode: 'onChange',
    });

    const [serverError, setServerError] = useState(null);

    const dispatch = useDispatch();

    const store = useStore();

    const roleId = useSelector(selectUserRole);

    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout;

        return store.subscribe(() => {
            let previousWasLogout = currentWasLogout;
            currentWasLogout = store.getState().app.wasLogout;

            if (previousWasLogout !== currentWasLogout) {
                reset();
            }
        });
    }, [store, reset]);

    const onSubmit = ({ login, password }) => {
        server.register(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }
            setServerError(null);
            dispatch(setUser(res));
        });
    };

    const formError =
        errors?.login?.message ||
        errors?.password?.message ||
        errors?.passcheck?.message;
    const errorMessage = serverError || formError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={className}>
            <H2>Регистрация</H2>
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
                <Input
                    type="password"
                    placeholder="Проверка пароля..."
                    {...register('passcheck')}
                />
                <Button type="submit" disabled={!isValid}>
                    зарегистрироваться
                </Button>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </form>
        </div>
    );
};

export const Registration = styled(RegistrationContainer)`
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
