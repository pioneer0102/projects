import { combineReducers } from '@reduxjs/toolkit';
import pos from './posSlice';

const reducer = combineReducers({
    pos,
});

export default reducer;
