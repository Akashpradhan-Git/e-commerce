import axios from "../../config/axiosInstance";
import { API_HOST } from "../../api/api";

//TODO : To change the  api url please visit the api folder

console.log(`${API_HOST}`);

//Login User
const login = async (userData) => {
    try {
        const { data } = await axios.post(`/login`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(data.data);
        if (data.data) {
            localStorage.setItem('user', JSON.stringify(data.data));
        }
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    login,
    logout
}
export default authService;