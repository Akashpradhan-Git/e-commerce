import React, { useEffect } from 'react'
import PageName from '../../../components/page_components/PageName'
import PageLayout from '../../../components/layout/pageLayout'
import MainLayout from '../../../components/layout/main'
import InputField from '../../../components/form-element/InputField'
import * as api from '../../../services/productApi'
import Spinner from '../../../components/util/Spinner'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react';
import CustomSelect from '../../../components/form-element/CustomSelect'
import useSWR from 'swr'
import { convertToBase64, convertFromBase64 } from '../../../util/base64'
import { v4 as uuidv4 } from 'uuid';

const addProduct = () => {

    const [isLoading, setIsLoading] = useState(false); // loading state
    // const [categoryMap, setCategoryMap] = useState([]);
    // const [dynamicOption, setDynamicOption] = useState({});
    const [formData, setFormData] = useState([])
    const [brand, setBrand] = useState([])
    const [brandOptions, setBrandOptions] = useState([])
    const [storeId, setStoreId] = useState([])
    const [productType, setProductType] = useState("")
    const [materialType, setMaterialType] = useState("")
    const [productImage, setProductImage] = useState([])

    const [convertImage, setConvertImage] = useState("")

    const productTypeDropdown = [
        { label: 'Select Product Type', value: '' },
        { label: 'Bulk', value: 'BULK' },
        { label: 'Single', value: 'SINGLE' },
        { label: 'Both', value: 'BOTH' },
    ]

    const materialTypeDropdown = [
        { label: 'Select Material Type', value: '' },
        { label: 'Row', value: 'row' },
        { label: 'Finished', value: 'finished' },
    ]

    //* get all category list
    const { data } = useSWR('/product-master/get-all-headers-p-categories', api.getAllProductCategories);
    const options = [
        { label: 'Select Category', value: '' },
    ]
    if (data) {
        data.map(d => {
            options.push({
                "value": d.categoryCode,
                "label": d.categoryName
            })
        })
    }

    const formik = useFormik({
        initialValues: {
            productTitle: "",
            productDesc: ""
        },
        validationSchema: Yup.object({
            productTitle: Yup.string().required('Product Title is required'),
            productDesc: Yup.string().required('Brand Description is required'),
        }),
        onSubmit: async (values, { resetForm }) => {

            const payload = submitData(values)
            console.log("Payload", payload)
            const response = await api.saveProduct(payload)
            console.log("Response", response)

            setIsLoading(true)
            if (response && response.data) {
                toast.success(response.message)
                setIsLoading(false)
                resetForm()
            }
            else {
                toast.error("Product Not Added")
                setIsLoading(false)
            }
        },
    });

    const submitData = (values) => {

        const formData = {
            ...values,

            productType: productType.value,
            materialType: materialType.value,
            category: {
                categoryCode: storeId[storeId.length - 1]
            },
            brand: {
                brandId: brand.value
            },
            productCode: null,
            productImages: { productImage }
        }
        return formData
    }

    //Category change handler 
    const handleCategoryChange = async (value) => {
        setStoreId(v => [...v, value.value])
        fetchData(value)
    }



    const fetchData = async (value) => {
        const response = await api.getAllSubCategories(value.value)
        console.log(response)
        let dropdownData = []
        let f = []
        if (response && response.data.length > 0) {
            response.data.map(d => {
                dropdownData.push({
                    "value": d.categoryCode,
                    "label": d.categoryName
                })
            })
            // setDynamicOption(dropdownData)
            f.push(getDropdownValue(dropdownData, value.label))
            setFormData(currentArray => {
                console.log(currentArray)
                return [...currentArray, getDropdownValue(dropdownData, value.label)]
            })
        }
        else {
            const res = await api.getBrandDetailsByCode(value.value)
            const data = getBrandOptionValue(res)
            setBrandOptions(data)

        }
    }



    // get dropdown value for brand

    const getBrandOptionValue = (data) => {
        const prodOptions = []
        if (data) {
            data.map(d => {
                prodOptions.push({
                    "value": d.brandId,
                    "label": d.brandName
                })
            })

        }
        return prodOptions
    }


    function getDropdownValue(dynamicOption, label = "Select Sub Category") {

        return (
            <div className='col-md-3' key={uuidv4()}>
                <CustomSelect
                    isMulti={false}
                    onChange={handleCategoryChange}
                    options={dynamicOption}
                    name="categoryMap"
                    label={`Select from ${label}`}
                />
            </div>
        )
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setProductImage(base64);


    };

    return (
        <>
            <PageLayout>
                <PageName title="Add Product Brand" />

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Add Brand</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className='col-md-3'>
                                            <CustomSelect
                                                isMulti={false}
                                                onChange={handleCategoryChange}
                                                options={options}
                                                name="categoryMap"
                                                label={`Select from Category`}

                                            />
                                        </div>

                                        {
                                            formData ? formData : null
                                        }

                                        {
                                            brandOptions && brandOptions.length > 0 ?
                                                <div className='col-md-3'>
                                                    <CustomSelect
                                                        isMulti={false}
                                                        onChange={(value) => setBrand(value)}
                                                        options={brandOptions}
                                                        name="brand"
                                                        label="Select Brand"
                                                    />
                                                </div>
                                                : ""
                                        }


                                        <div className='col-md-3'>
                                            <CustomSelect
                                                isMulti={false}
                                                onChange={(value) => setProductType(value)}
                                                options={productTypeDropdown}
                                                name="productType"
                                                label="Product Type"
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <CustomSelect
                                                isMulti={false}
                                                onChange={(value) => setMaterialType(value)}
                                                options={materialTypeDropdown}
                                                name="materialType"
                                                label="Material Type"
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.productTitle}
                                                placeholder="Product Title"
                                                label="Product Title"
                                                name="productTitle"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.productTitle && formik.touched.productTitle ? formik.errors.productTitle : null}
                                            />
                                        </div>


                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.productDesc}
                                                placeholder="Product Description"
                                                label="Product Description"
                                                name="productDesc"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.productDesc && formik.touched.productDesc ? formik.errors.productDesc : null}
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <div className='form-group'>
                                                <label htmlFor="input-field">Upload Category Image</label>
                                                <input type="file" name='categoryImage' accept="image/x-png,image/gif,image/jpeg" multiple className="form-control form-control-sm" id="input-field" placeholder="Enter Category" onChange={(e) => handleFileUpload(e)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-4 center'>
                                        <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}
addProduct.Layout = MainLayout;
export default addProduct