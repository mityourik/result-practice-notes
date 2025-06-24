import styled from 'styled-components';
import { Icon } from '../Icon/Icon';
import { Link, useNavigate } from 'react-router-dom';

const StyledLink = styled(Link)`
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    font-weight: bold;
    font-size: 0.7em;
    text-transform: uppercase;
    margin: 0 5px 0 0;
    text-decoration: none;
    color: #333;
`;

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

const StyledButton = styled.button`
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
                <StyledLink to="/login">Войти</StyledLink>
                <StyledLink to="/logout">
                    <Icon size="18px" id="fa-sign-out" />
                </StyledLink>
            </RightAligned>
            <RightAligned>
                <StyledButton onClick={() => navigate(-1)}>
                    <Icon size="18px" id="fa-chevron-circle-left" />
                </StyledButton>
                <StyledLink to="/post">
                    <Icon size="18px" id="fa-file-text" />
                </StyledLink>
                <StyledLink to="/users">
                    <Icon size="18px" id="fa-users" />
                </StyledLink>
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)`
    display: flex;
    flex-direction: column;
`;
