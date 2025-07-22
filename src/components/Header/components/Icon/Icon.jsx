import styled from 'styled-components';

const IconContainer = ({ className, id, ...rest }) => (
    <div className={className} {...rest}>
        <i className={`fa ${id}`} aria-hidden="true"></i>
    </div>
);

export const Icon = styled(IconContainer)`
    font-size: ${({ size }) => size || '2em'};
    margin: ${({ margin }) => margin || '0'};
    cursor: pointer;
    color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
`;
