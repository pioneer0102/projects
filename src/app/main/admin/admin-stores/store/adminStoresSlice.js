import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllStores = async (filter) => {
    const response = await axios.post('/api/getAllStores', filter);
    return response.data;
};

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

export const getUsersinStore = async (data) => {
    const response = await axios.post('/api/getUsersinStore', data);
    return response.data;
};

export const removeUserinStore = createAsyncThunk(
    'storesApp/stores/removeUserinStore',
    async (data) => {
        const response = await axios.post('/api/removeUserinStore', data);
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

export const updataPos = createAsyncThunk(
    'storesApp/stores/updataPos',
    async (data) => {
        const response = await axios.post('/api/updataPos', data);
        return response.data;
    }
);

export const selectFilter = ({ adminStores }) => adminStores.stores.filter;
export const selectStore = ({ adminStores }) => adminStores.stores.store;
export const selectUserFilter = ({ adminStores }) =>
    adminStores.stores.userFilter;
export const selectUsersInStore = ({ adminStores }) =>
    adminStores.stores.usersInStore;

const adminStoresSlice = createSlice({
    name: 'adminStores/stores',
    initialState: {
        store: {
            name: '',
            address: '',
            integrations: [],
            email: '',
            pos: {},
            taxes: [],
            departments: []
        },
        usersInStore: {
            pagedUsers: [],
            totalUsers: 0
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
            state.userFilter = action.payload;
        },
        setUsersInStore: (state, action) => {
            state.usersInStore.pagedUsers = action.payload.pagedUsers;
            state.usersInStore.totalUsers = action.payload.totalUsers;
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
        modifyPos: (state, action) => {
            state.store.pos = action.payload;
        }
    },
    extraReducers: (builder) => {
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
            console.log(action.payload);
        });
        builder.addCase(updateUserinStore.fulfilled, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(removeUserinStore.fulfilled, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(updataPos.fulfilled, (state, action) => {
            console.log(action.payload);
        });
    }
});

export const {
    setFilter,
    initializeStore,
    setUserFilter,
    setFormdata,
    update,
    remove,
    setUsersInStore,
    modifyPos
} = adminStoresSlice.actions;

export default adminStoresSlice.reducer;
