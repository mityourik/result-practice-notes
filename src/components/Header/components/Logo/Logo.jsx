import styled from 'styled-components';
import { Icon } from '../Icon/Icon';
import { Link } from 'react-router-dom';

const TextsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
`;

const LargeText = styled.div`
    text-transform: uppercase;
    font-size: 1.7em;
    font-weight: 900;
    line-height: 1em;
    color: #333;
`;

const SmallText = styled.div`
    font-size: 0.7em;
    font-weight: bold;
    line-height: 1em;
    color: #333;
`;

const LogoContainer = ({ className }) => (
    <Link className={className} to="/">
        <Icon size="49px" id="fa-code" />
        <TextsContainer>
            <LargeText>Блог</LargeText>
            <SmallText>веб-разработчика</SmallText>
        </TextsContainer>
    </Link>
);

export const Logo = styled(LogoContainer)`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
`;
