import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';

export const getOrders = async (searchData) => {
    const response = await axios.post('/api/getorders', searchData);
    return response.data;
};

export const getItem = createAsyncThunk('orderApp/orders/getItems', async (itemId) => {
    const response = await axios.get(`/api/getItem`, { id: itemId });
    return response.data;
});

export const updateStatusById = createAsyncThunk('orderApp/orders/updateStatus', async (statusData) => {
    const response = await axios.post(`/api/updateStatus`, statusData);
    return response.data;
});

export const updateItemStatusById = createAsyncThunk('orderApp/orders/updateItemStatusById', async (statusData) => {
    const response = await axios.post(`/api/updateItemStatusById`, statusData);
    return response.data;
});

export const removeItem = createAsyncThunk('orderApp/orders/removeItem', async (item) => {
    const response = await axios.post(`/api/removeItem`, item);
    return response.data;
});

const ordersAdapter = createEntityAdapter({});

export const selectSearchText = ({ ordersApp }) => ordersApp.orders.searchText;
export const selectSubtotal = ({ ordersApp }) => ordersApp.orders.subtotal;
export const selectChannel = ({ ordersApp }) => ordersApp.orders.channel;
export const selectStatus = ({ ordersApp }) => ordersApp.orders.status;
export const selectPageNumber = ({ ordersApp }) => ordersApp.orders.pageNumber;
export const selectPageSize = ({ ordersApp }) => ordersApp.orders.pageSize;

export const selectDBsize = ({ ordersApp }) => ordersApp.orders.dbSize;

export const {
    selectAll: selectOrders
} = ordersAdapter.getSelectors((state) => state.ordersApp.orders);

export const selectTaxInfo = ({ ordersApp }) => ordersApp.orders.taxInfo;
export const selectOrderInfo = ({ ordersApp }) => ordersApp.orders.orderInfo;

const ordersSlice = createSlice({
    name: 'ordersApp/orders',
    initialState: ordersAdapter.getInitialState({
        subtotal: '',
        channel: '',
        status: '',
        searchText: '',
        pageNumber: 0,
        pageSize: 10,
        dbSize: 0,
        taxInfo: [],
        orderInfo: {},
        updateFlag: false,
        removeFlag: false,
    }),
    reducers: {
        setSubtotal: (state, action) => {
            state.subtotal = action.payload;
        },
        setChannel: (state, action) => {
            state.channel = action.payload;

        },
        setStatus: (state, action) => {
            state.status = action.payload;

        },
        updateItemStatus: (state, action) => {
            state.taxInfo[action.payload.itemIndex].status = action.payload.itemStatus;
        },
        setOrderSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setPagenumber: (state, action) => {
            state.pageNumber = action.payload;
        },
        setPagesize: (state, action) => {
            state.pageSize = action.payload;

        },
        updateStatus: (state, action) => {
            state.orderInfo.history[action.payload.history].status = action.payload.status;
        },
        removeFront : (state, action) => {
            _.remove(state.taxInfo, { id: action.payload });
        },
        submit: (state, action) => {
            state.subtotal = action.payload.subtotal;
            state.channel = action.payload.channel;
            state.status = action.payload.status;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getItem.fulfilled, (state, action) => {
            state.taxInfo = action.payload.taxInfo;
            state.orderInfo = action.payload.orderInfo;
        });
        builder.addCase(updateStatusById.fulfilled, (state, action) => {
            state.updateFlag = action.payload.success;
        });
        builder.addCase(removeItem.fulfilled, (state, action) => {
            state.removeFlag = action.payload.success;
            state.orderInfo.subtotal = action.payload.subtotal;
        })
    }
});

export const { setSubtotal, setChannel, setStatus, setOrderSearchText, setPagenumber, setPagesize, updateStatus, removeFront, submit, updateItemStatus } = ordersSlice.actions;

export default ordersSlice.reducer;