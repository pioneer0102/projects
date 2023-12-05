import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getInventory = async (searchData) => {
    const response = await axios.post('/api/getInventory', searchData);
    return response.data;
};

const inventoryAdapter = createEntityAdapter({});

export const selectSearchText = ({ inventoryApp }) => inventoryApp.inventory.searchText;
export const selectPrice = ({ inventoryApp }) => inventoryApp.inventory.price;
export const selectCategory = ({ inventoryApp }) => inventoryApp.inventory.category;
export const selectPageNumber = ({ inventoryApp }) => inventoryApp.inventory.pageNumber;
export const selectPageSize = ({ inventoryApp }) => inventoryApp.inventory.pageSize;

export const {
    selectAll: selectAllInventory
} = inventoryAdapter.getSelectors((state) => state.inventoryApp.inventory);

const inventorySlice = createSlice({
    name: 'inventoryApp/inventory',
    initialState: inventoryAdapter.getInitialState({
        price: '',
        category: '',
        searchText: '',
        pageNumber: 0,
        pageSize: 10,
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

        }
    }
});

export const { setInventorySearchText, setInventoryPrice, setInventoryCategory, setPagenumber, setPagesize } = inventorySlice.actions;

export default inventorySlice.reducer;