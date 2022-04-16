import axios from "axios"
import { API_HOST } from "../../api/api"

// Get user goals
const getUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.get(`${API_HOST}/1.0/umt/users/lists`, config)

    return data.data
}

const goalService = {
    getUser,
}

export default goalService