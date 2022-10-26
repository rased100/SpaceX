import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer from '../features/rockets/rocketSlice';

export const store = configureStore({
    reducer: {
        rockets: rocketsReducer
    },
});


