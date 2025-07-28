/**
 * Конфигурация API и других глобальных настроек
 */
export const API_CONFIG = {
    BASE_URL: 'http://localhost:3005',
    ENDPOINTS: {
        USERS: '/users',
        AUTH: '/auth',
        COMMENTS: '/comments',
        POSTS: '/posts',
        SESSIONS: '/sessions',
    },
    REQUEST_TIMEOUT: 5000,
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};
