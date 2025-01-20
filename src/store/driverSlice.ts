import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { drivers } from '../types/driver';

export const fetchDrivers = createAsyncThunk<drivers[]>(
    'drivers/fetchDrivers',
    async () => {
        const response = await fetch('/drivers.json'); // Using a public source as this data could change.
        let jsonData = await response.json();
        const data: drivers[] = jsonData.data;

        // Ensure 'data' is an array before mapping 
        if (!Array.isArray(data)) {
            return [];
        }

        return data;
    }
);

const initialState: drivers[] = [];

const driverSlice = createSlice({
    name: 'drivers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDrivers.fulfilled, (state, action: PayloadAction<drivers[]>) => {
            // Replace the state with the fetched data, while using the state parameter 
            state.length = 0; // Clear the current state array 
            state.push(...action.payload);
        });
    },
});

export default driverSlice.reducer;
