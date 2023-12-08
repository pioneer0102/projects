import { combineReducers } from '@reduxjs/toolkit';
import channel from './channelSlice';
import category from './categorySlice';

const reducer = combineReducers({
    channel,
    category
});

export default reducer;
