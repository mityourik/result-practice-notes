import { API_CONFIG } from '../config.js';
import { transformSession } from '../transformers';

export const getSession = async (hash) => {
    return fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SESSIONS}?hash=${hash}`
    )
        .then((loadedSession) => loadedSession.json())
        .then(
            ([loadedSession]) =>
                loadedSession && transformSession(loadedSession)
        );
};
