import { createSlice } from '@reduxjs/toolkit';
export const errorHandler = createSlice({
    name: "user",
    initialState: {
        error: '',
    },
    reducers: {
        setError: (state, action) => {
            state.userName = action.payload
        },
        resetError: (state) => {
            state.userName = ""
        }
    }
})

export const { setError, resetError } = errorHandler.actions;
export default errorHandler.reducer;