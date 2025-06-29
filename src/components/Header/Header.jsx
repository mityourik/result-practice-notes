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
    max-width: 900px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background: #f0f0f0;
    border-radius: 2px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    padding: 5px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
