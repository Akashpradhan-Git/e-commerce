import axios from "../config/axiosInstance";
import getToken from '../config/getToken';

// * : Get all user List
export const getUsersList = async () => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/1.0/umt/users/lists`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return data.data.content;
    } catch (error) {
        console.log(error);
    }
}



//* Get user by its id (View User)

export const getUserById = async (uniqueId) => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/1.0/umt/users/edit/${uniqueId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}


//* Update user by its id

export const updateUser = async (uniqueId, updateData) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/1.0/umt/users/save', updateData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        return data;
    } catch (error) {
        console.log(error)
    }
}