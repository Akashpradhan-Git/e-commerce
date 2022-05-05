import axios from "../config/axiosInstance";
import getToken from '../config/getToken';

// ***********************************************************************************************************************
// ***********************************************************************************************************************
// TODO:                                         USER API
// ***********************************************************************************************************************
// ***********************************************************************************************************************



//* TODO: SAVE USER Details
export const saveUser = async (saveData) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/1.0/umt/users/save', saveData,
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



// * TODO:  GET ALL user List
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

//* TODO:  GET USER by its ID View User)
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


//* TODO: UPDATE user by its id
export const updateUser = async (uniqueId, updateData) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/1.0/umt/users/update', updateData,
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


//* FIXME: get User Role By its Id
export const getUserRoleById = async (id) => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/1.0/umt/roles/user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return data.data[0];
    } catch (error) {
        console.log(error);
    }
}


// ***********************************************************************************************************************
// ***********************************************************************************************************************
// TODO:                                         ROLE API
// ***********************************************************************************************************************
// ***********************************************************************************************************************



// TODO: SAVE Role Details
export const saveRole = async (saveRole) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/1.0/umt/roles/save', saveRole,
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


//  TODO: GET ROLE list
export const getRoleList = async () => {
    const token = getToken();
    const { data } = await axios.get(`/1.0/umt/roles/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data.data;
}

// TODO: GET ROLE by its ID

export const getRoleById = async (id) => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/1.0/umt/roles/${id}`, {
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


export const updateRole = async (updateRole) => {
    try {
        const token = getToken()
        let { data } = await axios.post(`1.0/umt/roles/addNupdate`, updateRole,
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