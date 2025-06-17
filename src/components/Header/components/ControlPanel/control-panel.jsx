import styled from 'styled-components';
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
    justify-content: flex-end;
    align-items: center;
`;

const ControlPanelContainer = ({ className }) => {
    return (
        <div className={className}>
            <RightAligned>
                <UserText>Юзер</UserText>
                <Icon size="18px" id="fa-sign-out" />
            </RightAligned>
            <RightAligned>
                <Icon size="18px" id="fa-chevron-circle-left" />
                <Icon size="18px" id="fa-file-text" />
                <Icon size="18px" id="fa-users" />
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)`
    display: flex;
    flex-direction: column;
`;
