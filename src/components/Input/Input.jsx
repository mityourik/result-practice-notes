import PropTypes from 'prop-types';
import styled from 'styled-components';
import { forwardRef } from 'react';

const InputContainer = forwardRef(({ className, ...props }, ref) => {
    return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
    margin: 0 0 8px;
    padding: 7px;
    border: 1px solid #000;
    border-radius: 2px;
    font-size: 15px;
    width: ${({ width = '100%' }) => width};
    box-sizing: border-box;
`;
