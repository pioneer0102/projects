import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getPos = createAsyncThunk(
    'settingsApp/pos/getPos', async () => {
        const response = await axios.get('/api/getPos');
        return response.data;
    }
);

export const updatePos = createAsyncThunk(
    'settingsApp/pos/updatePos',
    async (formData) => {
        const response = await axios.post('/api/updatePos', formData);
        return response.data;
    }
);
export const selectPosDetail = ({ settingsApp }) => settingsApp.pos.posDetail;

const posSlice = createSlice({
    name: 'settingsApp/pos',
    initialState: {
        posDetail: {
            id: '',
            type: '',
            userName: '',
            password: '',
            url: '',
            taxes: [],
            departments: []
        }
    },
    reducers: {
        setFormdata: (state, action) => {
            switch (action.payload.type) {
                case 'type':
                    state.posDetail.type = action.payload.value;
                    break;
                case 'userName':
                    state.posDetail.userName = action.payload.value;
                    break;
                case 'password':
                    state.posDetail.password = action.payload.value;
                    break;
                case 'url':
                    state.posDetail.url = action.payload.value;
                    break;
                case 'tax':
                    state.posDetail.taxes.push(
                        {
                            name: action.payload.value.name,
                            rate: action.payload.value.rate
                        }
                    );
                    break;
                case 'department':
                    state.posDetail.departments.push(
                        {
                            name: action.payload.value.name,
                            rate: action.payload.value.rate
                        }
                    );
                    break;
            }
        },
        update: (state, action) => {
            let temp;
            switch (action.payload.type) {
                case 'tax':
                    temp = state.posDetail.taxes[action.payload.id];
                    temp[action.payload.key] = action.payload.value;
                    break;
                case 'department':
                    temp = state.posDetail.departments[action.payload.id];
                    temp[action.payload.key] = action.payload.value;
                    break;
            }
        },
        remove: (state, action) => {
            let temp;
            switch (action.payload.type) {
                case 'tax':
                    temp = state.posDetail.taxes.filter((_, i) => i !== action.payload.id);
                    state.posDetail.taxes = temp;
                    break;
                case 'department':
                    temp = state.posDetail.departments.filter((_, i) => i !== action.payload.id);
                    state.posDetail.departments = temp;
                    break;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPos.fulfilled, (state, action) => {
            state.posDetail = action.payload;
        })
    }
});

export const {
    setFormdata,
    update,
    remove
} = posSlice.actions;

export default posSlice.reducer;
