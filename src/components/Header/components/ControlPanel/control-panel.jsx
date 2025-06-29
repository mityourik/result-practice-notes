import styled from 'styled-components';
import { Icon } from '../Icon/Icon';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../../components';

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
    justify-content: space-between;
    align-items: center;
`;

const StyledIcon = styled.button`
    border: none;
    background: none;
    cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            <RightAligned>
                <UserText>Юзер</UserText>
                <Link to="/login">
                    <Button>Войти</Button>
                </Link>
                <Link to="/logout">
                    <Icon size="18px" id="fa-sign-out" />
                </Link>
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
