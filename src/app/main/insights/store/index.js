import { combineReducers } from '@reduxjs/toolkit';
import channel from './channelSlice';
import category from './categorySlice';
import sale from './saleSlice';
import order from './orderSlice';

const reducer = combineReducers({
    channel,
    category,
    sale,
    order
});

export default reducer;
