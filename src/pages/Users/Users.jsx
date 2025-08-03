import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { H2, PrivateContent } from '../../components';
import { ROLE } from '../../constants';
import { useServerRequest } from '../../hooks';
import { selectUserRole, selectUserSession } from '../../selectors';
import { TableRow, UserRow } from './components';
import { checkAccess } from '../../utils';

const UsersContainer = ({ className }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

    const requestServer = useServerRequest();
    const userRole = useSelector(selectUserRole);
    const session = useSelector(selectUserSession);

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole) || !session) {
            return;
        }

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
    }, [requestServer, shouldUpdateUserList, userRole, session]);

    const onUserRemove = (userId) => {
        if (!checkAccess([ROLE.ADMIN], userRole) || !session) {
            return;
        }

        requestServer('removeUser', userId).then(() => {
            setShouldUpdateUserList(!shouldUpdateUserList);
        });
    };

    return (
        <PrivateContent serverError={errorMessage} access={[ROLE.ADMIN]}>
            <div className={className}>
                <H2>Пользователи</H2>
                {userRole !== ROLE.ADMIN ? (
                    <div>
                        Доступ запрещен. Только администраторы могут
                        просматривать список пользователей.
                    </div>
                ) : (
                    <div>
                        <TableRow>
                            <div className="login-column">Логин</div>
                            <div className="registered-at-column">
                                Дата регистрации
                            </div>
                            <div className="role-column">Роль</div>
                        </TableRow>
                        {users.map(
                            ({ id, login, registeredAt, roleId, idx }) => {
                                const filteredRoles = roles.filter(
                                    (role) =>
                                        String(role.id) !== String(ROLE.GUEST)
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
                            }
                        )}
                    </div>
                )}
            </div>
        </PrivateContent>
    );
};

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    height: calc(100vh - 199px);
`;
