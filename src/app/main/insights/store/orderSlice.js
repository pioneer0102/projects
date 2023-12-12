import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrderData = createAsyncThunk(
    'insightsApp/order/orderData',
    async (filter) => {
        const response = await axios.post('/api/getorderData', filter);
        return response.data;
    }
);

export const orderFilter = ({ insightsApp }) => insightsApp.order.orderFilter;
export const selectOrder = ({ insightsApp }) => insightsApp.order.order;

const orderSlice = createSlice({
    name: 'insightsApp/order',
    initialState: {
        orderFilter: {
            status: ''
        },
        order: []
    },
    reducers: {
        setOrderFilter: (state, action) => {
            switch (action.payload.type) {
                case 'status':
                    state.orderFilter.status = action.payload.value;
                    break;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrderData.fulfilled, (state, action) => {
            state.order = action.payload;
        });
    }
});

export const { setOrderFilter } = orderSlice.actions;

export default orderSlice.reducer;
