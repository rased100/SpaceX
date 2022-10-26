import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer from '../features/rockets/rocketSlice';

export const store = configureStore({
    reducer: {
        rockets: rocketsReducer
    },
});









// import { createStore } from "@reduxjs/toolkit";
// import reducers from "../features/redux/reducers";


// export const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


