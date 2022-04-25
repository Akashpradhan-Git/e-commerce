import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menuSlice'
import authReducer from '../redux/auth/authSlice'
import userReducer from '../redux/userSlice'
export default configureStore({
    reducer: {
        switchMenu: menuReducer,
        auth: authReducer,
        user: userReducer
    }
})
