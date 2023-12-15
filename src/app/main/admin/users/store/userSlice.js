import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = async (filterData) => {
    const response = await axios.post('/admin/api/getUsers', filterData);
    return response.data;
};

export const getUserById = createAsyncThunk(
    'adminUsers/user/getUserById',
    async (id) => {
        const response = await axios.get('/admin/api/getUserById', { id: id });
        return response.data;
    }
);

export const addUser = createAsyncThunk(
    'adminUsers/user/addUser',
    async (data) => {
        const response = await axios.post('/admin/api/addUser', data);
        return response.data;
    }
);

export const updateUser = createAsyncThunk(
    'adminUsers/user/updateUser',
    async (data) => {
        const response = await axios.post('/admin/api/updateUser', data);
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    'adminUsers/user/deleteUser',
    async (id) => {
        const response = await axios.post('/admin/api/deleteUser', { id: id });
        return response.data;
    }
);

const userAdapter = createEntityAdapter({});

export const { selectAll: selectAllUsers } = userAdapter.getSelectors(
    (state) => state.adminUsers.user
);

export const selectFilter = ({ adminUsers }) => adminUsers.user.filter;
export const selectTotalCount = ({ adminUsers }) => adminUsers.user.totalCount;
export const selectUser = ({ adminUsers }) => adminUsers.user.user;
export const selectActionStatus = ({ adminUsers }) =>
    adminUsers.user.actionStatus;

const userSlice = createSlice({
    name: 'adminUsers/user',
    initialState: userAdapter.getInitialState({
        filter: {
            searchText: '',
            rowsPerPage: 10,
            page: 0
        },
        totalCount: 0,
        user: {
            id: '',
            name: '',
            url: '',
            role: ''
        },
        actionStatus: false
    }),
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setUserEntityAdapter: (state, action) => {
            state.totalCount = action.payload.filterSize;
            userAdapter.setAll(state, action.payload.pagedData);
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserById.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.actionStatus = action.payload.success;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.actionStatus = action.payload.success;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                userAdapter.removeOne(state, action.payload.id);
                state.totalCount = state.totalCount - 1;
            });
    }
});

export const { setFilter, setUserEntityAdapter, setUser, update, remove } =
    userSlice.actions;

export default userSlice.reducer;
