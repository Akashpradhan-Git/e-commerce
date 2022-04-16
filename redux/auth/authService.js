import axios from "axios";
import { API_HOST } from "../../api/api";

//TODO : To change the  api url please visit the api folder

console.log(`${API_HOST}`);

//Login User
const login = async (userData) => {
    try {
        const response = await axios.post(`${API_HOST}/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
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