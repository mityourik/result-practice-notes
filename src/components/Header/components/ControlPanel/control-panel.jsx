import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../../../actions';
import { Button } from '../../../../components';
import { ROLE } from '../../../../constants';
import {
    selectUserLogin,
    selectUserRole,
    selectUserSession,
} from '../../../../selectors';
import { Icon } from '../Icon/Icon';

const UserText = styled.p`
    font-weight: bold;
    font-size: 0.7em;
    color: #333;
    display: flex;
    text-transform: uppercase;
    margin: 0 5px 0 0;
`;

const RightAligned = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`;

const StyledIcon = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);
    const session = useSelector(selectUserSession);

    return (
        <div className={className}>
            <RightAligned>
                {roleId === ROLE.GUEST ? (
                    <Button>
                        <StyledLink to="/login">Войти</StyledLink>
                    </Button>
                ) : (
                    <>
                        <UserText>{login}</UserText>
                        <StyledIcon
                            onClick={() => dispatch(logout(session))}
                            title="Выйти"
                        >
                            <Icon size="18px" id="fa-sign-out" />
                        </StyledIcon>
                    </>
                )}
            </RightAligned>
            <RightAligned>
                <StyledIcon onClick={() => navigate(-1)}>
                    <Icon size="18px" id="fa-chevron-circle-left" />
                </StyledIcon>
                <Link to="/post">
                    <Icon size="18px" id="fa-file-text" />
                </Link>
                <Link to="/users">
                    <Icon size="18px" id="fa-users" />
                </Link>
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)`
    display: flex;
    flex-direction: column;
`;
