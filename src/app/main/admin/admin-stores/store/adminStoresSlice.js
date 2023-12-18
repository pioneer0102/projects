import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

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

export const updateStoreDetail = createAsyncThunk(
    'storesApp/stores/updateStoreDetail',
    async (data) => {
        console.log(data);
        const response = await axios.post('/api/updateStoreDetail', data);
        return response.data;
    }
);

export const removeUserFromDB = createAsyncThunk(
    'storesApp/stores/removeUserFromDB',
    async (data) => {
        const response = await axios.post('/api/removeUserFromDB', data);
        return response.data;
    }
);

export const addUserinStore = createAsyncThunk(
    'storesApp/stores/addUserinStore',
    async (data) => {
        const response = await axios.post('/api/addUserinStore', data);
        return response.data;
    }
);

export const updateUserinStore = createAsyncThunk(
    'storesApp/stores/updateUserinStore',
    async (data) => {
        const response = await axios.post('/api/updateUserinStore', data);
        return response.data;
    }
);

export const modifyPos = createAsyncThunk(
    'storesApp/stores/modifyPos',
    async (data) => {
        const response = await axios.post('/api/modifyPos', data);
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
            email: '',
            pos: {},
            users: [],
            taxes: [],
            departments: []
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
                email: '',
                pos: {},
                users: [],
                taxes: [],
                departments: []
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
        },
        setFormdata: (state, action) => {
            switch (action.payload.type) {
                case 'tax':
                    state.store.taxes.push({
                        name: action.payload.value.name,
                        rate: action.payload.value.rate
                    });
                    break;
                case 'department':
                    state.store.departments.push({
                        name: action.payload.value.name,
                        taxId: action.payload.value.taxId
                    });
                    break;
            }
        },
        update: (state, action) => {
            let temp;
            switch (action.payload.type) {
                case 'tax':
                    temp = state.store.taxes[action.payload.id];
                    temp[action.payload.key] = action.payload.value;
                    break;
                case 'department':
                    temp = state.store.departments[action.payload.id];
                    temp[action.payload.key] = action.payload.value;
                    break;
            }
        },
        remove: (state, action) => {
            let temp;
            switch (action.payload.type) {
                case 'tax':
                    temp = state.store.taxes.filter(
                        (_, i) => i !== action.payload.id
                    );
                    state.store.taxes = temp;
                    break;
                case 'department':
                    temp = state.store.departments.filter(
                        (_, i) => i !== action.payload.id
                    );
                    state.store.departments = temp;
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
        builder.addCase(updateStoreDetail.fulfilled, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(addUserinStore.fulfilled, (state, action) => {
            state.store.users.push(action.payload);
        });
        builder.addCase(updateUserinStore.fulfilled, (state, action) => {
            const { id, ...updatedUserData } = action.payload;
            _.assign(
                _.find(state.store.users, { id: parseInt(id) }),
                updatedUserData
            );
        });
        builder.addCase(removeUserFromDB.fulfilled, (state, action) => {
            _.remove(state.store.users, { id: action.payload.userId });
        });
        builder.addCase(modifyPos.fulfilled, (state, action) => {
            state.store.pos[action.payload.type] = action.payload.value;
        });
    }
});

export const {
    setFilter,
    initializeStore,
    setUserFilter,
    setFormdata,
    update,
    remove
} = adminStoresSlice.actions;

export default adminStoresSlice.reducer;
