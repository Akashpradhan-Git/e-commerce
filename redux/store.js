import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menuSlice'
import authReducer from '../redux/auth/authSlice'
import userReducer from '../redux/userSlice'
import errorReducer from '../redux/errorHandler'
export default configureStore({
    reducer: {
        switchMenu: menuReducer,
        auth: authReducer,
        user: userReducer,
        error: errorReducer
    }
})
