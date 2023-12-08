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

const getRandomStatus = () => {
    const statusList = ['received', 'pending', 'pickedup', 'completed'];
    const randomIndex = Math.floor(Math.random() * statusList.length);
    return statusList[randomIndex];
};

const ordersAdapter = createEntityAdapter({});

export const selectSearchText = ({ ordersApp }) => ordersApp.orders.searchText;
export const selectSubtotal = ({ ordersApp }) => ordersApp.orders.subtotal;
export const selectChannel = ({ ordersApp }) => ordersApp.orders.channel;
export const selectStatus = ({ ordersApp }) => ordersApp.orders.status;
export const selectPageNumber = ({ ordersApp }) => ordersApp.orders.pageNumber;
export const selectPageSize = ({ ordersApp }) => ordersApp.orders.pageSize;
export const selectDbSize = ({ ordersApp }) => ordersApp.orders.dbSize;
export const selectFilterSize = ({ ordersApp }) => ordersApp.orders.filterSize;
export const selectFilter = ({ ordersApp }) => ordersApp.orders.filter;

export const {
    selectAll: selectOrders
} = ordersAdapter.getSelectors((state) => state.ordersApp.orders);

export const selectTaxInfo = ({ ordersApp }) => ordersApp.orders.taxInfo;
export const selectOrderInfo = ({ ordersApp }) => ordersApp.orders.orderInfo;

const ordersSlice = createSlice({
    name: 'ordersApp/orders',
    initialState: ordersAdapter.getInitialState({
        pageNumber: 0,
        pageSize: 10,
        dbSize: 0,
        taxInfo: [],
        orderInfo: {},
        updateFlag: false,
        removeFlag: false,
        newOrderId: null,
        filterSize: 0,
        filter: {
            searchText: '',
            subtotal: '',
            channel: '',
            status: '',
        }
    }),
    reducers: {
        setOrders: (state, action) => {
            const data = action.payload.pagedData;
            state.dbSize = action.payload.dbSize;
            state.filterSize = action.payload.filterSize;
            ordersAdapter.setAll(state, data);
        },
        setFilter: (state, action) => {
            switch (action.payload.type) {
                case 'searchText':
                    state.filter.searchText = action.payload.value;
                    break;
                case 'status':
                    state.filter.status = action.payload.value;
                    break;
                case 'subtotal':
                    state.filter.subtotal = action.payload.value;
                    break;
                case 'channel':
                    state.filter.channel = action.payload.value;
                    break;
            }
        },
        updateItemStatus: (state, action) => {
            state.taxInfo[action.payload.itemIndex].status = action.payload.itemStatus;
        },
        setPagenumber: (state, action) => {
            state.pageNumber = action.payload;
        },
        setPagesize: (state, action) => {
            state.pageSize = action.payload;
        },
        receivedNewOrder: (state, action) => {
            const randomNumber = Math.random();
            const scaledNumber = 5 + randomNumber * (Number.MAX_VALUE - 5);
            const newOrder = {
                "id": scaledNumber,
                "customer": "John Doe",
                "subtotal": "2500",
                "channel": "DoorDash",
                "tax": 100,
                "tip": 50,
                "history": [
                    {
                        "status": "received",
                        "date": "December 4, 2023 10:30 AM"
                    },
                    {
                        "status": "pending",
                        "date": "December 4, 2023 10:30 AM"
                    },
                    {
                        "status": "pickedup",
                        "date": "December 4, 2023 10:30 AM"
                    },
                    {
                        "status": getRandomStatus(),
                        "date": "December 4, 2023 10:30 AM"
                    }
                ],
                "items": [
                    {
                        "id": 14,
                        "quantity": "5",
                        "status": "replaced"
                    },
                    {
                        "id": 2,
                        "quantity": "5",
                        "status": ""
                    },
                    {
                        "id": 3,
                        "quantity": "5",
                        "status": ""
                    }
                ]
            }
            ordersAdapter.upsertOne(state, newOrder)
        },
        updateStatus: (state, action) => {
            state.orderInfo.history[action.payload.history].status = action.payload.status;
        },
        removeFront: (state, action) => {
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

export const {
    setOrders,
    setFilter,
    setPagenumber,
    setPagesize,
    updateStatus,
    removeFront,
    submit,
    updateItemStatus,
    receivedNewOrder
} = ordersSlice.actions;

export default ordersSlice.reducer;