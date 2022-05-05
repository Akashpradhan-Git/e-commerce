// ***********************************************************************************************************************
// ***********************************************************************************************************************
// TODO:                                         Master's API
// ***********************************************************************************************************************
// ***********************************************************************************************************************


import axios from "../config/axiosInstance";
import getToken from '../config/getToken';


//TODO: SAVE Country Details
export const saveCountry = async (payload) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/country/save-country', payload,
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

// TODO: GET  All Countries
export const getCountryList = async () => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/country/get-all-countries`, {
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


//TODO: SAVE state Details
export const saveState = async (payload) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/state/save-state', payload,
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



// TODO: GET  All States
export const getStateList = async () => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/state/get-all-states`, {
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





//TODO: SAVE City Details
export const saveCity = async (payload) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/city/save-city', payload,
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