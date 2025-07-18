import styled from 'styled-components';
import { Icon } from '../../../../components/Header/components/Icon/Icon';
import { useDispatch } from 'react-redux';
import { TableRow } from '../TableRow/TableRow';

const UserRowContainer = ({
    className,
    login,
    registeredAt,
    roleId: userRoleId,
}) => {
    const dispatch = useDispatch();
    const roles = [];
    const onRoleChange = () => {};
    return (
        <div className={className}>
            <TableRow>
                <div className="login-column">{login}</div>
                <div className="registered-at-column">{registeredAt}</div>
                <div className="role-column"></div>
                <select value={userRoleId} onChange={onRoleChange}>
                    {roles.map(({ id: roleId, name: roleName }) => (
                        <option value={roleId}>{roleName}</option>
                    ))}
                </select>
                <Icon
                    id="fa-floppy-o"
                    onClick={() => dispatch(/* TODO */)}
                ></Icon>
            </TableRow>
            <Icon id="fa-trash-o" onClick={() => dispatch(/* TODO */)}></Icon>
        </div>
    );
};

export const UserRow = styled(UserRowContainer)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
