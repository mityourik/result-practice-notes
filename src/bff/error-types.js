export const ErrorTypes = {
    CONNECTION_ERROR: 'CONNECTION_ERROR',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    USER_EXISTS: 'USER_EXISTS',
    CREATION_ERROR: 'CREATION_ERROR',
};

export class AppError extends Error {
    constructor(type, message) {
        super(message);
        this.type = type;
    }
}
