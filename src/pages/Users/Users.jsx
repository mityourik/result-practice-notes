// import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { H2 } from '../../components';
import { TableRow, UserRow } from './components';

const UsersContainer = ({ className }) => {
    // const dispatch = useDispatch();
    const users = [];
    // const roles = [];
    return (
        <div className={className}>
            <H2>Пользователи</H2>
            <div>
                <TableRow>
                    <div className="login-column">Логин</div>
                    <div className="registered-at-column">Дата регистрации</div>
                    <div className="role-column">Роль</div>
                </TableRow>

                {users.map(({ id, login, registeredAt, roleId }) => (
                    <UserRow
                        key={id}
                        login={login}
                        registeredAt={registeredAt}
                        roleId={roleId}
                    />
                ))}
            </div>
        </div>
    );
};

export const Users = styled(UsersContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;
