import styled from 'styled-components';
import { Icon } from '../../../../components/Header/components/Icon/Icon';
import { TableRow } from '../TableRow/TableRow';
import { useState } from 'react';
import { useServerRequest } from '../../../../hooks';

const UserRowContainer = ({
    className,
    id,
    login,
    registeredAt,
    roleId: userRoleId,
    roles,
    border,
    onUserRemove,
}) => {
    const [initialRoleId, setInitialRoleId] = useState(userRoleId);
    const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
    const requestServer = useServerRequest();

    const onRoleChange = (e) => {
        setSelectedRoleId(Number(e.target.value));
    };

    const onRoleSave = (userId, newUserRoleId) => {
        requestServer('updateUserRole', userId, newUserRoleId).then(() => {});
        setInitialRoleId(newUserRoleId);
    };

    const isSaveButtonDisabled = selectedRoleId === initialRoleId;

    return (
        <div className={className}>
            <TableRow border={border}>
                <div className="login-column">{login}</div>
                <div className="registered-at-column">{registeredAt}</div>
                <div className="role-column"></div>
                <select value={selectedRoleId} onChange={onRoleChange}>
                    {roles.map(({ id: roleId, name: roleName }) => (
                        <option value={roleId} key={roleId}>
                            {roleName}
                        </option>
                    ))}
                </select>
                <Icon
                    size="1.5em"
                    id="fa-floppy-o"
                    onClick={() => onRoleSave(id, selectedRoleId)}
                    disabled={isSaveButtonDisabled}
                ></Icon>
            </TableRow>
            <Icon
                size="1.5em"
                id="fa-trash-o"
                margin="0 0 3px 6px"
                onClick={onUserRemove}
            ></Icon>
        </div>
    );
};

export const UserRow = styled(UserRowContainer)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & select {
        font-size: 12px;
        border-radius: 2px;
        padding: 2px 8px;
        background: none;
        border: none;
    }
`;
