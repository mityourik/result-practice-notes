export const formatError = (error) => ({
    error: error?.message || 'Неизвестная ошибка',
    res: null,
});
