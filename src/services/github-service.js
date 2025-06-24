/**
 * Получить последние публичные события пользователя GitHub
 * @param {string} username - GitHub username
 * @param {number} limit - Сколько событий вернуть
 * @returns {Promise<Array>} Массив событий
 */
export const getGithubUserEvents = async (username, limit = 1) => {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/events/public`
        );
        if (!response.ok) throw new Error('Failed to fetch GitHub events');
        const data = await response.json();
        return Array.isArray(data) ? data.slice(0, limit) : [];
    } catch (e) {
        console.error('GitHub API error:', e);
        return [];
    }
};

/**
 * Получить последний коммит пользователя (по публичным событиям)
 * @param {string} username - GitHub username
 * @returns {Promise<Object|null>} Объект коммита или null
 */
export const getLastGithubCommit = async (username) => {
    const events = await getGithubUserEvents(username, 10);
    const pushEvent = events.find(
        (e) =>
            e.type === 'PushEvent' &&
            e.payload &&
            e.payload.commits &&
            e.payload.commits.length > 0
    );
    if (!pushEvent) return null;
    const commit =
        pushEvent.payload.commits[pushEvent.payload.commits.length - 1];
    return {
        repo: pushEvent.repo.name,
        message: commit.message,
        url: `https://github.com/${pushEvent.repo.name}/commit/${commit.sha}`,
        date: pushEvent.created_at,
    };
};
