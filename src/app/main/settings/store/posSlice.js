import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllPos = async (filterData) => {
    const response = await axios.post('/api/getAllPos', filterData);
    return response.data;
}

export const getPosById = createAsyncThunk('settingsApp/pos/getPosById',
    async (id) => {
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
        posById: {}
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
        setPos: (state, action) => {
            state.totalCount = action.payload.filterSize;
            posAdapter.setAll(state, action.payload.pagedData);
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
                            tax_name: action.payload.value.tax_name,
                            tax_rate: action.payload.value.tax_rate
                        }
                    );
                    break;
                case 'department':
                    state.posById.department.push(
                        {
                            department_name: action.payload.value.department_name,
                            tax_rate: action.payload.value.tax_rate
                        }
                    );
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
    setFormdata
} = posSlice.actions;

export default posSlice.reducer;