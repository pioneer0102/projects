import { combineReducers } from '@reduxjs/toolkit';
import item from './itemSlice';

const reducer = combineReducers({
    item
});

export default reducer;
