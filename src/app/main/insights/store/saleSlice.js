import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSaleData = createAsyncThunk(
    'insightsApp/sale/getsaleData',
    async (filter) => {
        const response = await axios.post('/api/getsaleData', filter);
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

const saleSlice = createSlice({
    name: 'insightsApp/sale',
    initialState: {
        saleFilter: {
            fromDate: '',
            toDate: '',
            category: '',
            item: ''
        },
        saleArray: [],
        graphTable: true,
        tableFilter: {
            fromDate: '',
            toDate: '',
            category: '',
            item: '',
            rowsPerPage: 10,
            page: 0
        },
        tableData: [],
        totalCount: 0,
        tabValue: 0,
        responseGraphWarning: false,
        responseTableWarning: false
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
            }
        },
        setGraphTable: (state, action) => {
            console.log(action.payload);
            state.graphTable = action.payload;
        },
        setTableFilter: (state, action) => {
            switch (action.payload.type) {
                case 'rowsPerPage':
                    state.tableFilter.rowsPerPage = action.payload.value;
                    break;
                case 'page':
                    state.tableFilter.page = action.payload.value;
                    break;
                case 'fromDate':
                    state.tableFilter.fromDate = action.payload.value;
                    break;
                case 'toDate':
                    state.tableFilter.toDate = action.payload.value;
                    break;
                case 'category':
                    state.tableFilter.category = action.payload.value;
                    break;
                case 'item':
                    state.tableFilter.item = action.payload.value;
                    break;
            }
        },
        setTabValue: (state, action) => {
            state.tabValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSaleData.fulfilled, (state, action) => {
            if (action.payload.graph === 'keep') {
                console.log(action.payload);
            } else {
                if (action.payload.success === 'error date') {
                    state.responseGraphWarning = true;
                } else {
                    state.responseGraphWarning = false;
                    state.saleArray = action.payload;
                }
            }
        });
        builder.addCase(getSaleTableData.fulfilled, (state, action) => {
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
        });
    }
});

export const { setSaleFilter, setGraphTable, setTableFilter, setTabValue } =
    saleSlice.actions;

export default saleSlice.reducer;
