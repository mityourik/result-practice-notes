import styled from 'styled-components';

const Div = styled.div`
    background-color: #282c34;
    text-align: center;
`;

function App() {
    return (
        <Div>
            <i className="fa fa-camera-retro"></i>
            <h1>Welcome to My Styled App</h1>
        </Div>
    );
}

export default App;
