import item from './itemSlice';
import sale from './saleSlice';
import order from './orderSlice';
import { combineReducers } from '@reduxjs/toolkit';

const reducer = combineReducers({
    sale,
    order,
    item
});

export default reducer;
