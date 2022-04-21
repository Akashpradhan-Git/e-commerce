import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menuSlice'
import authReducer from '../redux/auth/authSlice'
export default configureStore({
    reducer: {
        switchMenu: menuReducer,
        auth: authReducer,
    }
})
