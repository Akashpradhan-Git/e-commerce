// ***********************************************************************************************************************
// ***********************************************************************************************************************
// TODO:                                       Product Master's API
// ***********************************************************************************************************************
// ***********************************************************************************************************************

import axios from "../config/axiosInstance";
import { getToken } from '../config/getLocalData';

//TODO: SAVE Product Category Details
export const saveProductCategory = async (payload) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/product-master/add-update-p-category', payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

        return data;
    } catch (error) {
        window.location.href = '/'
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
        console.log(error)
        window.location.href = '/'
    }
}




//TODO: SAVE Product Attribute Details
export const saveCategoryAttribute = async (payload) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/product-master/add-update-p-cat-attribute', payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

        return data;
    } catch (error) {
        console.log(error)
        //Redirect to login page
        window.location.href = '/'
    }
}





//TODO: SAVE Product Brand Details
export const saveBrand = async (payload) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/product-master/add-update-p-brands', payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

        return data;
    } catch (error) {
        console.log(error)
        window.location.href = '/'
    }
}



