const initialPostsState = {
    posts: [],
    loading: false,
    error: null,
};

export const postsReducer = (state = initialPostsState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
