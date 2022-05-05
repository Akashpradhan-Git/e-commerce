// ***********************************************************************************************************************
// ***********************************************************************************************************************
// TODO:                                       Product Master's API
// ***********************************************************************************************************************
// ***********************************************************************************************************************

import axios from "../config/axiosInstance";
import getToken from '../config/getToken';

//TODO: SAVE Product Category Details
export const saveProductCategory = async (payload) => {
    try {
        const token = getToken()
        console.log(token, payload)
        let { data } = await axios.post('/product-master/add-update-p-category', payload,
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





//TODO: List Product List Details
export const getProductCategory = async () => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/product-master/get-all-p-categories`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return data.data;
    } catch (error) {
        console.log(error);
    }
}