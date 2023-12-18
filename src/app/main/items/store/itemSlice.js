import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getItems = async (searchData) => {
    const response = await axios.post('/api/getItems', searchData);
    return response.data;
};

export const getItemById = createAsyncThunk(
    'itemsApp/item/getItemById',
    async (id) => {
        const response = await axios.get('/api/getItemById', { id: id });
        return response.data;
    }
);

export const addItem = createAsyncThunk(
    'itemsApp/item/addItem',
    async (data) => {
        const response = await axios.post('/api/addItem', data);
        return response.data;
    }
);

export const updateItem = createAsyncThunk(
    'itemsApp/item/updateItem',
    async (data) => {
        const response = await axios.post('/api/updateItem', data);
        return response.data;
    }
);

const itemAdapter = createEntityAdapter({});

export const selectFilter = ({ itemsApp }) => itemsApp.item.filter;
export const selectItem = ({ itemsApp }) => itemsApp.item.itemById;
export const selectTotalCount = ({ itemsApp }) => itemsApp.item.totalCount;
export const selectAllItems = ({ itemsApp }) =>
    itemAdapter.getSelectors().selectAll(itemsApp.item);

const itemSlice = createSlice({
    name: 'itemsSlice/item',
    initialState: itemAdapter.getInitialState({
        filter: {
            price: '',
            category: '',
            searchText: '',
            pageNumber: 0,
            pageSize: 10
        },
        totalCount: 0,
        itemById: {
            id: '',
            name: '',
            category: '',
            description: '',
            image: null,
            price: '',
            quantity: '',
            tax: '',
            upc: ''
        }
    }),
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setItem: (state, action) => {
            state.itemById = action.payload;
        },
        setItemAdapter: (state, action) => {
            state.totalCount = action.payload.filterSize;
            itemAdapter.setAll(state, action.payload.pagedData);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItemById.fulfilled, (state, action) => {
                state.itemById = action.payload;
                console.log(action.payload);
            })
            .addCase(addItem.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                console.log(action.payload);
            });
    }
});

export const { setFilter, setItemAdapter, setItem } = itemSlice.actions;

export default itemSlice.reducer;
