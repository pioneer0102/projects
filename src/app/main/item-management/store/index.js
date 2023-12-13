import { combineReducers } from '@reduxjs/toolkit';
import inventory from './inventorySlice';

const reducer = combineReducers({
    inventory
});

export default reducer;
