import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getItemData = createAsyncThunk(
    'insightsApp/item/orderData',
    async () => {
        const response = await axios.get('/api/getItemData');
        return response.data;
    }
);

export const selectItem = ({ insightsApp }) => insightsApp.item.item;

const itemSlice = createSlice({
    name: 'insightsApp/item',
    initialState: {
        item: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getItemData.fulfilled, (state, action) => {
            state.item = action.payload;
        });
    }
});

export default itemSlice.reducer;
