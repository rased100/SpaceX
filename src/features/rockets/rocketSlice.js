import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAsyncRockets = createAsyncThunk('rockets/fetchAsyncRockets', async () => {
    const response = await axios
        .get("https://api.spacexdata.com/v3/launches")
    return response.data;
});


export const fetchAsyncRocketDetail = createAsyncThunk('rockets/fetchAsyncRocketDetail', async (itemId) => {
    const response = await axios
        .get(`https://api.spacexdata.com/v3/launches/${itemId}`)
    return response.data;
});


const initialState = {
    rockets: {},
    rocket: {},
};


export const rocketSlice = createSlice({
    name: "rockets",
    initialState,
    reducers: {
        addRockets: (state, { payload }) => {
            state.rockets = payload;
        }
    },
    extraReducers: {
        [fetchAsyncRockets.pending]: () => {
            // console.log('panding');
        },
        [fetchAsyncRockets.fulfilled]: (state, { payload }) => {
            // console.log('fetched success');
            return { ...state, rockets: payload }
        },
        [fetchAsyncRockets.rejected]: () => {
            // console.log('rejected');
        },
        [fetchAsyncRocketDetail.fulfilled]: (state, { payload }) => {
            // console.log('fetched success');
            return { ...state, rocket: payload }
        },
    }
});


export const { addRockets } = rocketSlice.actions;
export const getAllRockets = (state) => state.rockets.rockets;
export const getRocket = (state) => state.rockets.rocket;
export default rocketSlice.reducer;