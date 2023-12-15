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

export const getAllUsers = createAsyncThunk(
    'storesApp/stores/getAllUsers',
    async () => {
        const response = await axios.get('/api/getAllUsers');
        return response.data;
    }
);

export const addUserDB = createAsyncThunk(
    'storesApp/stores/addUserDB',
    async (data) => {
        const response = await axios.post('/api/addUserDB', data);
        return response.data;
    }
);

export const selectStores = ({ adminStores }) => adminStores.stores.stores;
export const selectFilter = ({ adminStores }) => adminStores.stores.filter;
export const selectStore = ({ adminStores }) => adminStores.stores.store;
export const selectUserFilter = ({ adminStores }) =>
    adminStores.stores.userFilter;
export const selectAllUsers = ({ adminStores }) => adminStores.stores.allUsers;

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
            usersData: [],
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
        },
        allUsers: []
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
                usersData: [],
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
        },
        removeUserFromUI: (state, action) => {
            _.remove(state.store.usersData, { id: action.payload });
        },
        addUserUI: (state, action) => {
            const user = _.find(state.allUsers, {
                id: parseInt(action.payload)
            });
            state.store.usersData.push(user);
            state.store.users.push(user.id);
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
        builder.addCase(removeUserFromDB, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.allUsers = action.payload;
        });
        // builder.addCase(addUserDB.fulfilled, (state, action) => {
        //     console.log(action.payload);
        // });
    }
});

export const {
    setFilter,
    initializeStore,
    setUserFilter,
    setFormdata,
    update,
    remove,
    removeUserFromUI,
    addUserUI
} = adminStoresSlice.actions;

export default adminStoresSlice.reducer;
