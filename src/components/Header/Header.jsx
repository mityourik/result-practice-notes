import styled from 'styled-components';
import { ControlPanel } from './components/ControlPanel/control-panel';
import { Logo } from './components/Logo';

const Discription = styled.p`
    text-align: left;
    font-size: 1em;
    color: #333;
    font-style: italic;
    display: flex;
    margin: 0;
    max-width: 30%;
    line-height: 1.3em;
`;

const Header = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    padding: 5px 20px;
`;

const HeaderContainer = () => (
    <Header>
        <Logo />
        <Discription>
            Блог описание веб-разработки и программирования
        </Discription>
        <ControlPanel />
    </Header>
);

export const StyledHeader = styled(HeaderContainer)`
    width: 100%;
    text-align: center;
    min-height: 100px;
    display: flex;
`;
