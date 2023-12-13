import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getInventory = async (searchData) => {
    const response = await axios.post('/api/getInventory', searchData);
    return response.data;
};

export const getInventoryById = createAsyncThunk(
    'inventoryApp/inventory/getInventoryById',
    async (id) => {
        const response = await axios.get('/api/getInventoryById', { id: id });
        return response.data;
    }
);

export const addInventory = createAsyncThunk(
    'inventoryApp/inventory/addInventory',
    async (data) => {
        const response = await axios.post('/api/addInventory', data);
        return response.data;
    }
);

export const updateInventory = createAsyncThunk(
    'inventoryApp/inventory/updateInventory',
    async (data) => {
        const response = await axios.post('/api/updateInventory', data);
        return response.data;
    }
);

const inventoryAdapter = createEntityAdapter({});

export const selectSearchText = ({ inventoryApp }) =>
    inventoryApp.inventory.searchText;
export const selectPrice = ({ inventoryApp }) => inventoryApp.inventory.price;
export const selectCategory = ({ inventoryApp }) =>
    inventoryApp.inventory.category;
export const selectPageNumber = ({ inventoryApp }) =>
    inventoryApp.inventory.pageNumber;
export const selectPageSize = ({ inventoryApp }) =>
    inventoryApp.inventory.pageSize;
export const selectInventory = ({ inventoryApp }) =>
    inventoryApp.inventory.inventory;

export const { selectAll: selectAllInventory } = inventoryAdapter.getSelectors(
    (state) => state.inventoryApp.inventory
);

const inventorySlice = createSlice({
    name: 'inventoryApp/inventory',
    initialState: inventoryAdapter.getInitialState({
        price: '',
        category: '',
        searchText: '',
        pageNumber: 0,
        pageSize: 10,
        inventory: {}
    }),
    reducers: {
        setInventorySearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setInventoryPrice: (state, action) => {
            state.price = action.payload;
        },
        setInventoryCategory: (state, action) => {
            state.category = action.payload;
        },
        setPagenumber: (state, action) => {
            state.pageNumber = action.payload;
        },
        setPagesize: (state, action) => {
            state.pageSize = action.payload;
        },
        submit: (state, action) => {
            state.price = action.payload.price;
            state.category = action.payload.category;
        },
        initializeInventory: (state) => {
            state.inventory = {
                id: '',
                category: '',
                description: '',
                image: null,
                price: '',
                quantity: '',
                tax: '',
                upc: ''
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInventoryById.fulfilled, (state, action) => {
            state.inventory = action.payload;
        });
        builder.addCase(addInventory.fulfilled, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(updateInventory.fulfilled, (state, action) => {
            console.log(action.payload);
        });
    }
});

export const {
    setInventorySearchText,
    setInventoryPrice,
    setInventoryCategory,
    setPagenumber,
    setPagesize,
    submit,
    initializeInventory
} = inventorySlice.actions;

export default inventorySlice.reducer;
