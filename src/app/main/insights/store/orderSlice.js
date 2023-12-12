import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrderData = createAsyncThunk(
    'insightsApp/order/getOrderData',
    async (filter) => {
        const response = await axios.post('/api/getorderData', filter);
        return response.data;
    }
);

export const orderFilter = ({ insightsApp }) => insightsApp.order.orderFilter;
export const selectOrder = ({ insightsApp }) => insightsApp.order.order;
export const tableOrder = ({ insightsApp }) => insightsApp.order.tableArray;

const orderSlice = createSlice({
    name: 'insightsApp/order',
    initialState: {
        orderFilter: {
            status: 'all'
        },
        order: {
            orderArray: [],
            completed: {
                current: 0,
                previous: 0
            },
            pending: {
                current: 0,
                previous: 0
            },
            received: {
                current: 0,
                previous: 0
            },
            rejected: {
                current: 0,
                previous: 0
            }
        },
        tableArray: []
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
            state.tableArray = action.payload.orderArray.reverse();
        });
    }
});

export const { setOrderFilter } = orderSlice.actions;

export default orderSlice.reducer;
