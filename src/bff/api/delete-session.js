import { API_CONFIG } from '../config';

export const deleteSession = async (sessionId) => {
    fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SESSIONS}/${sessionId}`,
        {
            method: 'DELETE',
        }
    );
};
