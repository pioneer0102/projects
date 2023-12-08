import { combineReducers } from '@reduxjs/toolkit';
import pos from './posSlice';
import user from './userSlice';

const reducer = combineReducers({
    pos,
    user
});

export default reducer;
