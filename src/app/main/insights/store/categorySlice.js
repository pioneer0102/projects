import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const categoryStatisticalData = createAsyncThunk(
    'insightsApp/category/categoryStatisticalData',
    async () => {
        const response = await axios.get('/api/getcategorydata');
        return response.data;
    });

export const selectOrderStatistics = ({ insightsApp }) => insightsApp.category.orderStatistics;
export const selectSaleStatistics = ({ insightsApp }) => insightsApp.category.saleStatistics;
export const selectSaleTotalByCategory = ({ insightsApp }) => insightsApp.category.saleTotalByCategory;
export const selectOrderTotalByCategory = ({ insightsApp }) => insightsApp.category.orderTotalByCategory;

const categorySlice = createSlice({
    name: 'insightsApp/category',
    initialState: {
        saleStatistics: {},
        orderStatistics: {},
        saleTotalByCategory: {},
        orderTotalByCategory: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(categoryStatisticalData.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.saleStatistics = action.payload.saleArray;
            state.orderStatistics = action.payload.orderArray;
            state.saleTotalByCategory = action.payload.saleTotalByCategory;
            state.orderTotalByCategory = action.payload.orderTotalByCategory;
        });
    }
});


export default categorySlice.reducer;