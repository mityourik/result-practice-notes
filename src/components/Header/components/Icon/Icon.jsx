import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, isButton, ...rest }) => {
    const { isButton: _, ...domProps } = { isButton, ...rest };
    return (
        <div className={className} {...domProps}>
            <i className={`fa ${id}`} aria-hidden="true"></i>
        </div>
    );
};

export const Icon = styled(IconContainer)`
    font-size: ${({ size }) => size || '2em'};
    margin: ${({ margin }) => margin || '0'};
    cursor: pointer;
    color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};

    &:hover {
        cursor: ${({ isButton }) => (isButton ? 'pointer' : 'default')};
    }
`;

Icon.propTypes = {
    id: PropTypes.string.isRequired,
    isButton: PropTypes.bool,
};
