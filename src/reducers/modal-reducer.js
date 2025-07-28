import { ACTION_TYPE } from '../actions';

const initialModalState = {
    isOpen: false,
    text: '',
    onConfirm: () => {},
    onCancel: () => {},
};

export const modalReducer = (state = initialModalState, action) => {
    switch (action.type) {
        case ACTION_TYPE.OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                ...action.payload,
            };
        case ACTION_TYPE.CLOSE_MODAL:
            return initialModalState;
        default:
            return state;
    }
};
