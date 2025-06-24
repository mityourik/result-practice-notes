import styled from 'styled-components';

const IconContainer = ({ className, id }) => (
    <div className={className}>
        <i className={`fa ${id}`} aria-hidden="true"></i>
    </div>
);

export const Icon = styled(IconContainer)`
    font-size: ${({ size }) => size || '2em'};
    margin: ${({ margin }) => margin || '0'};
    color: #333;
`;
