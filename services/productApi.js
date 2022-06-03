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


//FIXME: GET Product List Details
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


// FIXME: GET Single Product Category By Id
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




// FIXME: GET all header Product categories

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
        window.location.href = '/'
    }
}

// FIXME: GET Single Product Category By Id

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
        window.location.href = '/'
    }
}

// FIXME: GET Brand details from category code
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
        window.location.href = '/'
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




// FIXME: GET all products variation details by product id

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
        window.location.href = '/'
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

//FIXME: GET All Product Category Attributes

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
        window.location.href = '/'
    }
}

//TODO: SAVE Product variant attribute details

export const addProductAttribute = async (payload) => {
    try {
        const token = getToken()
        let { data } = await axios.post('/product-master/add-update-product-variant', payload,
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



//FIXME: GET All Product

export const getAllProductByID = async (productCode) => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/product-master/get-all-product/${productCode}`, {
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





//FIXME: GET published Product

export const getPublishedProduct = async (productID) => {
    console.log(productID)
    try {
        const token = getToken()
        const { data } = await axios.get(`/product-master/get-all-product-variant/${productID}/PRODUCT/PUBLISHED`, {
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


//FIXME: GET Unpublished Product

export const getUnPublishedProduct = async (productID) => {
    try {
        const token = getToken()
        const { data } = await axios.get(`/product-master/get-all-product-variant/${productID}/PRODUCT/UN-PUBLISHED`, {
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





//TODO: publish Product

export const publishedAttribute = async (payload) => {
    console.log(payload)
    try {
        const token = getToken()
        let { data } = await axios.post('/product-master/publish-product-variants', payload,
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