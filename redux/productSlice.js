import { createSlice } from '@reduxjs/toolkit';
export const productSlice = createSlice({
    name: "user",
    initialState: {
        productCode: '',
        categoryCode: '',
        pageStep: 3,
    },
    reducers: {
        setCode: (state, action) => {
            state.productCode = action.payload
        },
        setCategoryCode: (state, action) => {
            state.categoryCode = action.payload
        },
        setNextPageStep: (state, action) => {
            state.pageStep = state.pageStep + 1
        },
        setPreviousPageStep: (state, action) => {
            state.pageStep = state.pageStep - 1
        }
    }
})

export const { setCode, setNextPageStep, setPreviousPageStep, setCategoryCode } = productSlice.actions;
export default productSlice.reducer;