import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk(
    'ordersApp/orders/getOrders',
    async (params, {getState}) => {
        const state = getState().ordersApp.orders;
        // console.log(searchData.pageNumber);
        const searchData = {
            searchText: state.searchText,
            subtotal: state.subtotal,
            channel: state.channel,
            status: state.status,
            pageNumber:  state.pageNumber,
            pageSize: state.pageSize,
        };
        
        const response = await axios.post('/api/getorders', searchData);
        // const response = await axios.get(`/api/getorders?pageNumber=${pageNumber}&search=${searchText}&subtotal=${subtotal}&channel=${channel}&status=${status}`);

        const data = await response.data;

        return { data };
    }
);

export const getAllSize = createAsyncThunk(
    'ordersApp/orders/getAllSize',
    async (params, {getState}) => {

        const response = await axios.get('/api/getsize');
        // const response = await axios.get(`/api/getorders?pageNumber=${pageNumber}&search=${searchText}&subtotal=${subtotal}&channel=${channel}&status=${status}`);

        const data = await response.data;

        return data;
    }
)

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
        builder.addCase(getOrders.fulfilled, (state, action) => {
            const { data } = action.payload;
            console.log(data);
            ordersAdapter.setAll(state, data);
        });
        builder.addCase(getAllSize.fulfilled, (state, action) => {
            state.dbSize = action.payload;
        })
    }
});

export const { setOrderSubtotal, setOrderChannel, setOrderStatus, setOrderSearchText, setPagenumber, setPagesize } = ordersSlice.actions;

export default ordersSlice.reducer;