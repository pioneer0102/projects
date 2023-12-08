import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

const categorySlice = createSlice({
    name: 'insightsApp/category',
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        
    }
});


export default categorySlice.reducer;