import { ActionTypes } from "../contants/action-types";


export const setItems = (items) => {
    return {
        type: ActionTypes.SET_ITEMS,
        payload: items
    }
};

export const selectedItem = (item) => {
    return {
        type: ActionTypes.SELECTED_ITEM,
        payload: item
    }
};