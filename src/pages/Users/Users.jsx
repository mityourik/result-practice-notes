import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Content, H2 } from '../../components';
import { useServerRequest } from '../../hooks';
import { TableRow, UserRow } from './components';
import { ROLE } from '../../constants';

const UsersContainer = ({ className }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

    const requestServer = useServerRequest();

    useEffect(() => {
        const fetchData = () => {
            return Promise.all([
                requestServer('fetchUsers'),
                requestServer('fetchRoles'),
            ]).then(async ([usersRes, rolesRes]) => {
                if (usersRes.error || rolesRes.error) {
                    setErrorMessage(usersRes.error || rolesRes.error);
                    return;
                }

                const usersArr = usersRes.res ? await usersRes.res : [];
                const rolesArr = rolesRes.res ? await rolesRes.res : [];
                setUsers(usersArr);
                setRoles(rolesArr);
            });
        };

        fetchData().catch(() => {
            setErrorMessage('Ошибка при загрузке данных');
        });
    }, [requestServer, shouldUpdateUserList]);

    const onUserRemove = (userId) => {
        requestServer('removeUser', userId).then(() => {
            setShouldUpdateUserList(!shouldUpdateUserList);
        });
    };

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
                    {users.map(({ id, login, registeredAt, roleId, idx }) => {
                        const filteredRoles = roles.filter(
                            (role) => String(role.id) !== String(ROLE.GUEST)
                        );
                        return (
                            <UserRow
                                key={id}
                                id={id}
                                login={login}
                                registeredAt={registeredAt}
                                roleId={roleId}
                                roles={filteredRoles}
                                border={idx !== 0}
                                onUserRemove={() => onUserRemove(id)}
                            />
                        );
                    })}
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
