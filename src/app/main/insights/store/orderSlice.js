import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const orderData = createAsyncThunk(
    'insightsApp/channel/orderData',
    async () => {
        const response = await axios.get('/api/getsorderData');
        return response.data;
    }
);

export const orderFilter = ({ insightsApp }) => insightsApp.order.orderFilter;

const orderSlice = createSlice({
    name: 'insightsApp/order',
    initialState: {
        orderFilter: {
            status: ''
        }
    },
    reducers: {
        setOrderFilter: (state, action) => {
            switch (action.payload.type) {
                case 'status':
                    state.orderFilter.fromDate = action.payload.value;
                    break;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(orderData.fulfilled, (state, action) => {});
    }
});

export const { setOrderFilter } = orderSlice.actions;

export default orderSlice.reducer;
