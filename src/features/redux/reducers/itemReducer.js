import { ActionTypes } from "../contants/action-types";

const initialState = {
    products: [{
        id: 1,
        title: "Rased",
        category: "programmer",
    }]
};

export const itemReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_ITEMS:
            return state;
        default:
            return state;
    }
}