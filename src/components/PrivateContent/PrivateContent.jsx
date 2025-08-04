import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Error } from '../Error/Error';
import { selectUserRole } from '../../selectors';
import { ERROR, PROP_TYPE } from '../../constants';
import { checkAccess } from '../../utils';

export const PrivateContent = ({ children, serverError, access }) => {
    const userRole = useSelector(selectUserRole);

    const accessError = checkAccess(access, userRole)
        ? null
        : ERROR.ACCESS_DENIED;

    const error = serverError || accessError;

    return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
    children: PropTypes.node.isRequired,
    serverError: PROP_TYPE.ERROR,
    access: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
};
