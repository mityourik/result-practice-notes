export const formatError = (error) => ({
    error: error?.message || 'Неизвестная ошибка, попробуйте позже',
    res: null,
});
