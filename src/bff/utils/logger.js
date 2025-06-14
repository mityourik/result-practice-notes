/**
 * Уровни логирования
 */
export const LogLevel = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG',
};

class Logger {
    constructor() {
        this.enabled = import.meta.env.MODE !== 'production';
    }

    /**
     * Форматирует сообщение для лога
     */
    format(level, message, data = {}) {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            data,
        };
    }

    /**
     * Логирует информационное сообщение
     */
    info(message, data) {
        if (!this.enabled) return;
        console.log(JSON.stringify(this.format(LogLevel.INFO, message, data)));
    }

    /**
     * Логирует предупреждение
     */
    warn(message, data) {
        if (!this.enabled) return;
        console.warn(JSON.stringify(this.format(LogLevel.WARN, message, data)));
    }

    /**
     * Логирует ошибку
     */
    error(message, error) {
        if (!this.enabled) return;
        console.error(
            JSON.stringify(
                this.format(LogLevel.ERROR, message, {
                    error: error.message,
                    stack: error.stack,
                    type: error.type,
                })
            )
        );
    }

    /**
     * Логирует отладочное сообщение
     */
    debug(message, data) {
        if (!this.enabled) return;
        console.debug(
            JSON.stringify(this.format(LogLevel.DEBUG, message, data))
        );
    }
}

export const logger = new Logger();
