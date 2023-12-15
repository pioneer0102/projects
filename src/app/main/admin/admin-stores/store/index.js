import { combineReducers } from '@reduxjs/toolkit';
import stores from './adminStoresSlice';

const reducer = combineReducers({
    stores
});

export default reducer;
