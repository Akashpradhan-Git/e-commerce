import axios from "axios"
import { API_HOST } from "../../api/api"

//* create user 
const createUser = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(`${API_HOST}/1.0/umt/users/lists`, userData, config)
    return response.data
}



// Get user goals
const getUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.get(`${API_HOST}/1.0/umt/users/lists`, config)
    console.log(data)
    return data.data
}

const goalService = {
    getUser,
    createUser
}

export default goalService