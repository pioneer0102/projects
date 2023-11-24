import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk(
    'ordersApp/orders/getOrders',
    async () => {

        // console.log(searchData.pageNumber);
        const searchData = {
            searchText: selectSearchText,
            subtotal: selectSubtotal,
            channel: selectChannel,
            status: selectStatus,
            pageNumber: selectPageNumber,
            pageSize: selectPageSize,
        };
        // const response = await axios.get(`/api/getorders?pageNumber=${pageNumber}&search=${searchText}&subtotal=${subtotal}&channel=${channel}&status=${status}`);
        const response = await axios.post('/api/getorders', searchData);

        const data = await response.data;

        return { data };
    }
);

export const selectSearchText = ({ ordersApp }) => ordersApp.orders.searchText;
export const selectSubtotal = ({ ordersApp }) => ordersApp.orders.subtotal;
export const selectChannel = ({ ordersApp }) => ordersApp.orders.channel;
export const selectStatus = ({ ordersApp }) => ordersApp.orders.status;
export const selectPageNumber = ({ ordersApp }) => ordersApp.orders.pageNumber;
export const selectPageSize = ({ ordersApp }) => ordersApp.orders.pageSize;

const ordersAdapter = createEntityAdapter({});

export const {
    selectAll: selectOrders
} = ordersAdapter.getSelectors((state) => state.ordersApp.orders);

const ordersSlice = createSlice({
    name: "ordersApp/orders",
    initialState: ordersAdapter.getInitialState({
        subtotal: '',
        channel: '',
        status: '',
        searchText: '',
        pageNumber: 0,
        pageSize: 10
    }),
    reduers: {
        setOrderSubtotal: {
            reducer: (state, action) => {
                state.subtotal = action.payload;
            }
        },
        setOrderChannel: {
            reducer: (state, action) => {
                state.channel = action.payload;
            }
        },
        setOrderStatus: {
            reducer: (state, action) => {
                state.status = action.payload;
            }
        },
        setOrderSearchText: (state, action) => {
            state.searchText = action.payload;
            console.log(state.searchText)
        },
        setPagenumber: {
            reducer: (state, action) => {
                state.pageNumber = action.payload;
            }
        },
        setPagesize: {
            reducer: (state, action) => {
                state.pageSize = action.payload;
            }
        }
    },
    extraReducers: {
        [getOrders.fulfilled]: (state, action) => {
            const { data } = action.payload;
            ordersAdapter.setAll(state, data);
        }
    }
});

export const { setOrderSubtotal, setOrderChannel, setOrderStatus, setOrderSearchText, setPagenumber, setPagesize } = ordersSlice.actions;

export default ordersSlice.reducer;