import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
    <div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
    display: flex;
    align-items: center;
    border: ${({ border }) => (border ? '1.5px solid #000' : 'none')};
    border-radius: 3px;
    margin-bottom: 5px;

    & > div {
        padding: 0 10px;
    }

    & .login-column {
        width: 172px;
        font-size: 0.7em;
    }

    & .registered-at-column {
        width: 213px;
        font-size: 0.7em;
    }

    & .role-column {
        width: auto;
        font-size: 0.7em;
    }
`;
