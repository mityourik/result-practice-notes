import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '../../../../components/Header/components/Icon/Icon';
import { PROP_TYPE } from '../../../../constants';
import { useServerRequest } from '../../../../hooks';
import { TableRow } from '../TableRow/TableRow';
import styled from 'styled-components';

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
                    isButton={true}
                    size="1.5em"
                    id="fa-floppy-o"
                    onClick={() => onRoleSave(id, selectedRoleId)}
                    disabled={isSaveButtonDisabled}
                ></Icon>
            </TableRow>
            <Icon
                isButton={true}
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

UserRow.propTypes = {
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    registeredAt: PropTypes.string.isRequired,
    roleId: PROP_TYPE.ROLE.isRequired,
    roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
    border: PropTypes.bool,
    onUserRemove: PropTypes.func.isRequired,
};
