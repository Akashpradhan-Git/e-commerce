import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: "user",
    initialState: {
        userName: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.userName = action.payload
        },
        resetUser: (state) => {
            state.userName = ""
        }
    }
})

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;