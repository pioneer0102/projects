import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getItemData = createAsyncThunk(
    'insightsApp/item/getItemData',
    async () => {
        const response = await axios.get('/api/getItemData');
        return response.data;
    }
);

export const selectItem = ({ insightsApp }) => insightsApp.item.item;

const itemSlice = createSlice({
    name: 'insightsApp/item',
    initialState: {
        item: [],
        itemLoaded: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getItemData.pending, (state) => {
                state.itemLoaded = true;
            })
            .addCase(getItemData.fulfilled, (state, action) => {
                state.item = action.payload;
                state.itemLoaded = false;
            })
            .addCase(getItemData.rejected, (state) => {
                state.itemLoaded = false;
            });
    }
});

export default itemSlice.reducer;
