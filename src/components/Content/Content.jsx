import { Error } from '../Error/Error';

export const Content = ({ children, error }) => {
    return error ? <Error error={error} /> : children;
};
