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
        // window.location.href = '/'
    }
}


// TODO: GET Single Product Category By Id
export const getProductCategoryById = async (id) => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/product-master/get-p-category-details/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return data.data;
    } catch (error) {
        console.log(error)
        // window.location.href = '/'
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




// TODO: Get all header Product categories

// * Deep down api call is made to get all product categories


export const getAllProductCategories = async () => {
    try {
        const token = getToken()
        const { data } = await axios.get(`product-master/get-all-headers-p-categories`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return data.data;
    } catch (error) {
        console.log(error)
        // window.location.href = '/'
    }
}



export const getAllSubCategories = async (categoryId) => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/product-master/get-all-p-map-categories/${categoryId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return data;
    } catch (error) {
        console.log(error)
        // window.location.href = '/'
    }
}

// get Brand details from category code
export const getBrandDetailsByCode = async (categoryCode) => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/product-master/get-all-p-brands-by-catCode/${categoryCode}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return data.data;
    } catch (error) {
        console.log(error)
        // window.location.href = '/'
    }
}





//TODO: SAVE Product Details
export const saveProduct = async (payload) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/product-master/add-update-product', payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

        return data;
    } catch (error) {
        console.log(error)
        // window.location.href = '/'
    }
}




// TODO: Get all products variation details by product id

export const getAllProductVariant = async (productCode) => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/product-master/get-all-p-cat-variant-attributes/${productCode}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return data.data;
    } catch (error) {
        console.log(error)
        // window.location.href = '/'
    }
}



//TODO: SAVE Product variant attribute details

export const addProductVariantAttribute = async (payload) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/product-master/add-update-p-cat-variant-attributes', payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

        return data;
    } catch (error) {
        console.log(error)
        // window.location.href = '/'
    }
}

//TODO: Get All Product Category Attributes

export const getAllProductCategoryAttribute = async (productCode) => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/product-master/get-all-p-cat-attributes/${productCode}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        return data.data;
    } catch (error) {
        console.log(error)
        // window.location.href = '/'
    }
}