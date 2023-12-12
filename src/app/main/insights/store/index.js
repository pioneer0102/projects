import { combineReducers } from '@reduxjs/toolkit';
import channel from './channelSlice';
import category from './categorySlice';
import sale from './saleSlice';
import order from './orderSlice';
import item from './itemSlice';

const reducer = combineReducers({
    channel,
    category,
    sale,
    order,
    item
});

export default reducer;
