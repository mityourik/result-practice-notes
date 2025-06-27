import { API_CONFIG } from '../config';
import { AppError, ErrorTypes } from '../error-types';

/**
 * Базовый HTTP клиент для работы с API
 */
export class HttpClient {
    static async request(endpoint, options = {}) {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(
            () => controller.abort(),
            API_CONFIG.REQUEST_TIMEOUT
        );

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...API_CONFIG.DEFAULT_HEADERS,
                    ...options.headers,
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new AppError(
                    ErrorTypes.API_ERROR,
                    error.message || `HTTP ошибка: ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new AppError(
                    ErrorTypes.TIMEOUT_ERROR,
                    'Превышено время ожидания ответа от сервера'
                );
            }
            throw error;
        }
    }

    static get(endpoint) {
        return this.request(endpoint);
    }

    static post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    static put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    static delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE',
        });
    }
}
