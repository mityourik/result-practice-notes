import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Content, H2 } from '../../components';
import { useServerRequest } from '../../hooks';
import { TableRow, UserRow } from './components';

const UsersContainer = ({ className }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const requestServer = useServerRequest();

    useEffect(() => {
        Promise.all([
            requestServer('fetchUsers'),
            requestServer('fetchRoles'),
        ]).then(([usersRes, rolesRes]) => {
            if (usersRes.error || rolesRes.error) {
                setErrorMessage(usersRes.error || rolesRes.error);
                return;
            }
            setUsers(usersRes.res);
            setRoles(rolesRes.res);
        });
    }, [requestServer]);

    return (
        <div className={className}>
            <Content error={errorMessage}>
                <H2>Пользователи</H2>
                <div>
                    <TableRow>
                        <div className="login-column">Логин</div>
                        <div className="registered-at-column">
                            Дата регистрации
                        </div>
                        <div className="role-column">Роль</div>
                    </TableRow>

                    {Array.isArray(users) &&
                        users.map(({ id, login, registeredAt, roleId }) => (
                            <UserRow
                                key={id}
                                login={login}
                                registeredAt={registeredAt}
                                roleId={roleId}
                                roles={roles}
                            />
                        ))}
                </div>
            </Content>
        </div>
    );
};

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;
