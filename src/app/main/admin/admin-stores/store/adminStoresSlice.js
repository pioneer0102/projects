import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllStores = createAsyncThunk(
    'storesApp/stores/getAllStores',
    async (filter) => {
        const response = await axios.post('/api/getAllStores', filter);
        return response.data;
    }
);

export const getStoreById = createAsyncThunk(
    'storesApp/stores/getStoreById',
    async (data) => {
        const response = await axios.post('/api/getStoreById', data);
        return response.data;
    }
);

export const addStore = createAsyncThunk(
    'storesApp/stores/addStore',
    async (data) => {
        const response = await axios.post('/api/addStore', data);
        return response.data;
    }
);

export const updateStore = createAsyncThunk(
    'storesApp/stores/updateStore',
    async (data) => {
        const response = await axios.post('/api/updateStore', data);
        return response.data;
    }
);

export const selectStores = ({ adminStores }) => adminStores.stores.stores;
export const selectFilter = ({ adminStores }) => adminStores.stores.filter;
export const selectStore = ({ adminStores }) => adminStores.stores.store;
export const selectUserFilter = ({ adminStores }) =>
    adminStores.stores.userFilter;

const adminStoresSlice = createSlice({
    name: 'adminStores/stores',
    initialState: {
        stores: {
            pagedData: [],
            totalCount: 0
        },
        store: {
            name: '',
            address: '',
            integrations: [],
            usersData: []
        },
        filter: {
            searchText: '',
            rowsPerPage: 10,
            page: 0
        },
        userFilter: {
            searchText: '',
            rowsPerPage: 10,
            page: 0
        }
    },
    reducers: {
        setFilter: (state, action) => {
            switch (action.payload.type) {
                case 'searchText':
                    state.filter.searchText = action.payload.value;
                    break;
                case 'rowsPerPage':
                    state.filter.rowsPerPage = action.payload.value;
                    break;
                case 'page':
                    state.filter.page = action.payload.value;
                    break;
            }
        },
        initializeStore: (state) => {
            state.store = {
                name: '',
                address: '',
                integrations: [],
                users: [],
                usersData: []
            };
        },
        setUserFilter: (state, action) => {
            switch (action.payload.type) {
                case 'searchText':
                    state.userFilter.searchText = action.payload.value;
                    break;
                case 'rowsPerPage':
                    state.userFilter.rowsPerPage = action.payload.value;
                    break;
                case 'page':
                    state.userFilter.page = action.payload.value;
                    break;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllStores.fulfilled, (state, action) => {
            state.stores = action.payload;
        });
        builder.addCase(getStoreById.fulfilled, (state, action) => {
            state.store = action.payload;
        });
        builder.addCase(addStore.fulfilled, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(updateStore.fulfilled, (state, action) => {
            console.log(action.payload);
        });
    }
});

export const { setFilter, initializeStore, setUserFilter } =
    adminStoresSlice.actions;

export default adminStoresSlice.reducer;
