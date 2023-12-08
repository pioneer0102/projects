import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import _ from '@lodash';

export const getAllPos = async (filterData) => {
    const response = await axios.post('/api/getAllPos', filterData);
    return response.data;
}

export const getPosById = createAsyncThunk(
    'settingsApp/pos/getPosById', async (id) => {
        const response = await axios.get('/api/getPosById', { id: id });
        return response.data;
    }
);

export const addPos = createAsyncThunk('settingsApp/pos/addPos',
    async (formData) => {
        const response = await axios.post('/api/addPos', formData);
        return response.data;
    }
);

export const updatePos = createAsyncThunk('settingsApp/pos/updatePos',
    async (formData) => {
        const response = await axios.post('/api/updatePos', formData);
        return response.data;
    }
);

const posAdapter = createEntityAdapter({});

export const {
    selectAll: selectAllPos
} = posAdapter.getSelectors((state) => state.settingsApp.pos);

export const selectFilter = ({ settingsApp }) => settingsApp.pos.filter;
export const selectTotalCount = ({ settingsApp }) => settingsApp.pos.totalCount;
export const selectPosById = ({ settingsApp }) => settingsApp.pos.posById;

const posSlice = createSlice({
    name: 'settingsApp/pos',
    initialState: posAdapter.getInitialState({
        filter: {
            searchText: '',
            rowsPerPage: 10,
            page: 0
        },
        totalCount: 0,
        posById: {
            id: '',
            type: '',
            user_name: '',
            password: '',
            url: '',
            tax: [],
            department: []
        }
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
        initializePos: (state, action) => {
            state.posById = {
                id: '',
                type: '',
                user_name: '',
                password: '',
                url: '',
                tax: [],
                department: []
            }
        },
        setPos: (state, action) => {
            state.totalCount = action.payload.filterSize;
            posAdapter.setAll(state, action.payload.pagedData);
        },
        setFormdata: (state, action) => {
            switch (action.payload.type) {
                case 'type':
                    state.posById.type = action.payload.value;
                    break;
                case 'user_name':
                    state.posById.user_name = action.payload.value;
                    break;
                case 'password':
                    state.posById.password = action.payload.value;
                    break;
                case 'url':
                    state.posById.url = action.payload.value;
                    break;
                case 'tax':
                    state.posById.tax.push(
                        {
                            name: action.payload.value.name,
                            rate: action.payload.value.rate
                        }
                    );
                    break;
                case 'department':
                    state.posById.department.push(
                        {
                            name: action.payload.value.name,
                            rate: action.payload.value.rate
                        }
                    );
                    break;
            }
        },
        update: (state, action) => {
            let temp;
            switch (action.payload.type) {
                case 'tax':
                    // console.log(action.payload);
                    temp = state.posById.tax[action.payload.id];
                    temp[action.payload.key] = action.payload.value;
                    break;
                case 'department':
                    temp = state.posById.department[action.payload.id];
                    temp[action.payload.key] = action.payload.value;
                    break;
            }
        },
        remove: (state, action) => {
            let temp;
            switch (action.payload.type) {
                case 'tax':
                    // _.remove(state.posById.tax, { id: `${action.payload.id}` });
                    temp = state.posById.tax.filter((_, i) => i !== action.payload.id);
                    state.posById.tax = temp;
                    break;
                case 'department':
                    temp = state.posById.department.filter((_, i) => i !== action.payload.id);
                    state.posById.department = temp;
                    break;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPosById.fulfilled, (state, action) => {
            state.posById = action.payload;
        })
    }
});

export const {
    setFilter,
    setPos,
    initializePos,
    setFormdata,
    update,
    remove
} = posSlice.actions;

export default posSlice.reducer;