import { ActionTypes } from "../contants/action-types";

const initialState = {
    items: []
};

export const itemReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_ITEMS:
            return { ...state, items: payload };
        default:
            return state;
    }
}