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

const addProduct = () => {

    const [isLoading, setIsLoading] = useState(false); // loading state
    const [categoryMap, setCategoryMap] = useState([]);
    const [dynamicData, setDynamicData] = useState([]);
    const [dynamicOption, setDynamicOption] = useState({});
    const [dropdownValue, setDropdownValue] = useState('');

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
            brandDescription: "",
            productImage: "",
            productAttrVariants: "",
            productDesc: ""
        },
        validationSchema: Yup.object({
            productTitle: Yup.string().required('Product Title is required'),
            brandDescription: Yup.string().required('Brand Description is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const payload = submitData(values)
            const response = await api.saveBrand(payload)
            if (categoryMap == '' || categoryMap == undefined) {
                toast.error("Please select category")
                return
            }
            setIsLoading(true)
            if (response && response.data) {
                toast.success(response.message)
                setIsLoading(false)
                resetForm()
            }
            else {
                toast.error("Brand Not Added")
                setIsLoading(false)
            }
        },
    });

    const submitData = (values) => {
        const formData = {
            ...values,
            category: {
                categoryId: categoryMap.value
            }
        }
        return formData
    }

    // Category change handler 
    const handleCategoryChange = (value) => {
        setCategoryMap(value);
    }

    const fetchData = async () => {
        const response = await api.getAllSubCategories()
        if (dropdownValue) {

        }
        console.log(response)
        setDynamicData(response)
    }

    useEffect(() => {
        if (categoryMap.value) {
            fetchData()
        }
    }, [categoryMap]);


    const handleDynamicDropdownChange = (e) => {
        setDynamicOption({
            ...dynamicOption,
            [e.target.name]: e.target.value
        })
        setDropdownValue(e.target.value)
    }
    console.log(dynamicOption)

    console.log(dropdownValue)

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
                                                onChange={(value) => handleCategoryChange(value)}
                                                options={options}
                                                name="categoryMap"
                                                label="Select Category"
                                            />
                                        </div>

                                        {
                                            dynamicData.length > 0 ?
                                                <div className='col-md-3'>
                                                    <select className='form-control form-control-sm' name='dynamic' onChange={(e) => handleDynamicDropdownChange(e)}>
                                                        {dynamicData.map((d, index) => {
                                                            return <option value={d.id} key={index}>{d.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                : ""
                                        }

                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.brandName}
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
                                                value={formik.values.brandDescription}
                                                placeholder="Product Image"
                                                label="Product Image"
                                                name="productImage"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.productImage && formik.touched.productImage ? formik.errors.productImage : null}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.brandDescription}
                                                placeholder="Product Attribute Variants"
                                                label="Product Attribute Variants"
                                                name="productAttrVariants"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.productAttrVariants && formik.touched.productAttrVariants ? formik.errors.productAttrVariants : null}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.brandDescription}
                                                placeholder="Product Description"
                                                label="Product Description"
                                                name="productDesc"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.productDesc && formik.touched.productDesc ? formik.errors.productDesc : null}
                                            />
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