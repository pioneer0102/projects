import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = async (searchData) => {
    const response = await axios.post('/api/getorders', searchData);
    return response.data;
};

<<<<<<< HEAD
export const getItem = createAsyncThunk(
    'orderApp/orders/getItems',
    async (id, {dispatch, get}) => {
        const response = await axios.get('/api/getItem', {id: id});
        const data = await response.data;
        return data;
    }
);
=======
export const getItem = createAsyncThunk('orderApp/orders/getItems', async (itemId) => {
    const response = await axios.get(`/api/getItem`, {id: itemId});
    return response.data;
});
>>>>>>> e3ac1891d1925e64e7ed03891405c4e847c34fc2

const ordersAdapter = createEntityAdapter({});
const itemsAdapter = createEntityAdapter({});

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

export const selectItems = ({ ordersApp }) => ordersApp.orders.detail;
export const selectCustomer = ({ ordersApp }) => ordersApp.orders.customer;

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
        detail: [],
        customer: {}
    }),
    reducers: {
        setOrderSubtotal: (state, action) => {
            state.subtotal = action.payload;
        },
        setOrderChannel: (state, action) => {
            state.channel = action.payload;

        },
        setOrderStatus: (state, action) => {
            state.status = action.payload;

        },
        setOrderSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setPagenumber: (state, action) => {
            state.pageNumber = action.payload;

        },
        setPagesize: (state, action) => {
            state.pageSize = action.payload;

        }
    },
    extraReducers: (builder) => {
        builder.addCase(getItem.fulfilled, (state, action) => {
            state.detail = action.payload.detail;
            state.customer = action.payload.customer;
        });
    }
});

export const { setOrderSubtotal, setOrderChannel, setOrderStatus, setOrderSearchText, setPagenumber, setPagesize } = ordersSlice.actions;

export default ordersSlice.reducer;