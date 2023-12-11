import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSaleData = async (filter) => {
    const response = await axios.post('/api/getsaleData', filter);
    return response.data;
};

export const saleFilter = ({ insightsApp }) => insightsApp.sale.saleFilter;

const saleSlice = createSlice({
    name: 'insightsApp/sale',
    initialState: {
        saleFilter: {
            fromDate: '',
            toDate: '',
            category: '',
            item: ''
        }
    },
    reducers: {
        setSaleFilter: (state, action) => {
            switch (action.payload.type) {
                case 'fromDate':
                    state.saleFilter.fromDate = action.payload.value;
                    break;
                case 'toDate':
                    state.saleFilter.toDate = action.payload.value;
                    break;
                case 'category':
                    state.saleFilter.category = action.payload.value;
                    break;
                case 'item':
                    state.saleFilter.item = action.payload.value;
                    break;
            }
        }
    },
    extraReducers: (builder) => {}
});

export const { setSaleFilter } = saleSlice.actions;

export default saleSlice.reducer;
