import { combineReducers } from '@reduxjs/toolkit';
import stores from './adminStoreSlice';

const reducer = combineReducers({
    stores
});

export default reducer;
