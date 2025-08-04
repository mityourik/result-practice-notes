import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H2 } from '../H2/H2';
import { PROP_TYPE } from '../../constants';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 199px);
`;

export const Error = ({ error }) => {
    return (
        error && (
            <Div>
                <H2>Ошибка</H2>
                <div>{error}</div>
            </Div>
        )
    );
};

Error.propTypes = {
    error: PROP_TYPE.ERROR,
};
