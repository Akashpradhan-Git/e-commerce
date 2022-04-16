import { createSlice } from '@reduxjs/toolkit';
export const menuSlice = createSlice({
    name: "switchMenu",
    initialState: {
        menu: '',
        sideMenu: ""
    },
    reducers: {
        toggleMenu: (state) => {
            state.menu = !state.menu ? 'active' : '';
        },
        toggleSideMenu: (state) => {
            state.sideMenu = !state.sideMenu ? 'sidebar-icon-only' : '';
        }
    }
})

export const { toggleMenu, toggleSideMenu } = menuSlice.actions;
export default menuSlice.reducer;