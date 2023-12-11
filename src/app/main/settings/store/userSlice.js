import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUsers = async (filterData) => {
    const response = await axios.post('/api/getAllUsers', filterData);
    return response.data;
};

export const getUserById = createAsyncThunk(
    'settingsApp/user/getUserById',
    async (id) => {
        const response = await axios.get('/api/getUserById', { id: id });
        return response.data;
    }
);

export const addUser = createAsyncThunk(
    'settingsApp/user/addUser',
    async (data) => {
        const response = await axios.post('/api/addUser', data);
        return response.data;
    }
);

export const updateUser = createAsyncThunk(
    'settingsApp/user/updateUser',
    async (data) => {
        const response = await axios.post('/api/updateUser', data);
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    'settingsApp/user/deleteUser',
    async (id) => {
        const response = await axios.post('/api/deleteUser', { id: id });
        return response.data;
    }
);

const userAdapter = createEntityAdapter({});

export const { selectAll: selectAllUsers } = userAdapter.getSelectors(
    (state) => state.settingsApp.user
);

export const selectFilter = ({ settingsApp }) => settingsApp.user.filter;
export const selectTotalCount = ({ settingsApp }) =>
    settingsApp.user.totalCount;
export const selectUser = ({ settingsApp }) => settingsApp.user.user;
export const selectActionStatus = ({ settingsApp }) =>
    settingsApp.user.actionStatus;

const userSlice = createSlice({
    name: 'settingsApp/user',
    initialState: userAdapter.getInitialState({
        filter: {
            searchText: '',
            rowsPerPage: 10,
            page: 0
        },
        totalCount: 0,
        user: {},
        actionStatus: false
    }),
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
        setUserEntityAdapter: (state, action) => {
            state.totalCount = action.payload.filterSize;
            userAdapter.setAll(state, action.payload.pagedData);
        },
        initializeUser: (state) => {
            state.user = {
                id: '',
                name: '',
                url: '',
                role: ''
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.actionStatus = action.payload.success;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.actionStatus = action.payload.success;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            userAdapter.removeOne(state, action.payload.id);
            state.totalCount = state.totalCount - 1;
        });
    }
});

export const {
    setFilter,
    setUserEntityAdapter,
    initializeUser,
    update,
    remove
} = userSlice.actions;

export default userSlice.reducer;
