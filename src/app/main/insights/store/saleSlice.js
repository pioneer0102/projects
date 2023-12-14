import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSaleData = createAsyncThunk(
    'insightsApp/sale/getSaleData',
    async (filter) => {
        const response = await axios.post('/api/getSaleData', filter);
        return response.data;
    }
);

export const getSaleTableData = createAsyncThunk(
    'insightsApp/sale/getSaleTableData',
    async (tableFilter) => {
        const response = await axios.post('/api/getSaleTableData', tableFilter);
        return response.data;
    }
);

export const saleFilter = ({ insightsApp }) => insightsApp.sale.saleFilter;
export const selectSale = ({ insightsApp }) => insightsApp.sale.saleArray;
export const selectPieValue = ({ insightsApp }) => insightsApp.sale.pieValue;

export const selectGraphTable = ({ insightsApp }) =>
    insightsApp.sale.graphTable;
export const selectTableFilter = ({ insightsApp }) =>
    insightsApp.sale.tableFilter;
export const selectTableData = ({ insightsApp }) => insightsApp.sale.tableData;
export const selectTotalCount = ({ insightsApp }) =>
    insightsApp.sale.totalCount;
export const selectTabValue = ({ insightsApp }) => insightsApp.sale.tabValue;
export const selectResponseGraphWarning = ({ insightsApp }) =>
    insightsApp.sale.responseGraphWarning;
export const selectResponseTableWarning = ({ insightsApp }) =>
    insightsApp.sale.responseTableWarning;

const before30Days = new Date();
before30Days.setDate(before30Days.getDate() - 30);

const saleSlice = createSlice({
    name: 'insightsApp/sale',
    initialState: {
        saleFilter: {
            fromDate: before30Days,
            toDate: new Date(),
            category: '',
            item: '',
            channel: '',
            rowsPerPage: 10,
            page: 0
        },
        saleArray: [],
        pieValue: {},
        graphTable: true,
        tableData: [],
        totalCount: 0,
        tabValue: 0,
        responseGraphWarning: false,
        responseTableWarning: false,
        saleLoaded: false
    },
    reducers: {
        setSaleFilter: (state, action) => {
            switch (action.payload.type) {
                case 'fromDate':
                    state.saleFilter.fromDate = action.payload.value;
                    break;
                case 'toDate':
                    state.saleFilter.toDate = action.payload.value;
                    break;
                case 'category':
                    state.saleFilter.category = action.payload.value;
                    break;
                case 'item':
                    state.saleFilter.item = action.payload.value;
                    break;
                case 'rowsPerPage':
                    state.saleFilter.rowsPerPage = action.payload.value;
                    break;
                case 'page':
                    state.saleFilter.page = action.payload.value;
                    break;
                case 'channel':
                    state.saleFilter.channel = action.payload.value;
                    break;
            }
        },
        setGraphTable: (state, action) => {
            console.log(action.payload);
            state.graphTable = action.payload;
        },
        setTabValue: (state, action) => {
            state.tabValue = action.payload;
        },
        setRefresh: (state) => {
            state.saleFilter = {
                fromDate: before30Days,
                toDate: new Date(),
                category: '',
                item: '',
                channel: '',
                rowsPerPage: 10,
                page: 0
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSaleData.pending, (state) => {
                state.saleLoaded = true;
            })
            .addCase(getSaleData.fulfilled, (state, action) => {
                if (action.payload.graph === 'keep') {
                    console.log(action.payload);
                } else {
                    if (action.payload.success === 'error date') {
                        state.responseGraphWarning = true;
                    } else {
                        state.responseGraphWarning = false;
                        state.saleArray = action.payload.saleArray;
                        state.pieValue = action.payload.pieValue;
                    }
                }

                state.saleLoaded = false;
            })
            .addCase(getSaleData.rejected, (state) => {
                state.saleLoaded = false;
            })
            .addCase(getSaleTableData.pending, (state) => {
                state.saleLoaded = true;
            })
            .addCase(getSaleTableData.fulfilled, (state, action) => {
                if (action.payload.table === 'keep') {
                    console.log(action.payload);
                } else {
                    if (action.payload.success === 'error date') {
                        state.responseTableWarning = true;
                    } else {
                        state.responseTableWarning = false;
                        state.tableData = action.payload.pagedData;
                        state.totalCount = action.payload.totalCount;
                    }
                }
                state.saleLoaded = false;
            })
            .addCase(getSaleTableData.rejected, (state) => {
                state.saleLoaded = false;
            });
    }
});

export const { setSaleFilter, setGraphTable, setTabValue, setRefresh } =
    saleSlice.actions;

export default saleSlice.reducer;
