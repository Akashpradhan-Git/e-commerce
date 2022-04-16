import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menuSlice'
import authReducer from '../redux/auth/authSlice'
import userReducer from '../redux/user/userSlice'
export default configureStore({
    reducer: {
        switchMenu: menuReducer,
        auth: authReducer,
        usersData: userReducer,
    }
})
