import { createSlice } from '@reduxjs/toolkit';
export const productSlice = createSlice({
    name: "user",
    initialState: {
        productCode: '',
    },
    reducers: {
        setCode: (state, action) => {
            state.productCode = action.payload
        },

    }
})

export const { setCode } = productSlice.actions;
export default productSlice.reducer;