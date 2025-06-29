import styled from 'styled-components';

const ButtonContainer = ({ children, className, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const Button = styled(ButtonContainer)`
    width: ${({ width = '100%' }) => width};
    background-color: rgb(238, 238, 238);
    cursor: pointer;
    display: flex;
    font-size: 14px;
    margin: 0;
    padding: 7px;
    text-decoration: none;
    border: 1px solid rgb(0, 0, 0);
    text-align: center;
    border-radius: 2px;
    display: inline-block;
    transition:
        background 0.2s,
        color 0.2s,
        opacity 0.2s;

    &:hover {
        background-color: rgb(220, 220, 220);
    }

    &:disabled {
        background-color: #e0e0e0;
        color: #888;
        opacity: 0.6;
        cursor: not-allowed;
        border-color: #bbb;
    }
`;
