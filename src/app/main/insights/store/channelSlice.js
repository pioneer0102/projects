import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const channelStatisticalData = createAsyncThunk(
    'insightsApp/channel/channelStatisticalData',
    async () => {
        const response = await axios.get('/api/getchanneldata');
        return response.data;
    }
);

export const selectOrderStatistics = ({ insightsApp }) =>
    insightsApp.channel.orderStatistics;
export const selectSaleStatistics = ({ insightsApp }) =>
    insightsApp.channel.saleStatistics;
export const selectSaleTotalByChannel = ({ insightsApp }) =>
    insightsApp.channel.saleTotalByChannel;
export const selectOrderTotalByChannel = ({ insightsApp }) =>
    insightsApp.channel.orderTotalByChannel;

const channelSlice = createSlice({
    name: 'insightsApp/channel',
    initialState: {
        saleStatistics: {},
        orderStatistics: {},
        saleTotalByChannel: {},
        orderTotalByChannel: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(channelStatisticalData.fulfilled, (state, action) => {
            state.saleStatistics = action.payload.saleArray;
            state.orderStatistics = action.payload.orderArray;
            state.saleTotalByChannel = action.payload.saleTotalByChannel;
            state.orderTotalByChannel = action.payload.orderTotalByChannel;
        });
    }
});

export default channelSlice.reducer;
