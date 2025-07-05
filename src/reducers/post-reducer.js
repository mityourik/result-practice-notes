const initialPostState = {
    post: [],
    loading: false,
    error: null,
};

export const postReducer = (state = initialPostState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
