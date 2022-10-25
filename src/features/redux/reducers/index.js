import { combineReducers } from "@reduxjs/toolkit";
import { itemReducer, selectedItemReducer } from "./itemReducer";


const reducers = combineReducers({
    allItems: itemReducer,
    item: selectedItemReducer
});

export default reducers;