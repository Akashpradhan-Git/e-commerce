import React, { useEffect, useRef } from 'react'
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
import { useRouter } from 'next/router';
import CustomSelect from '../../../components/form-element/CustomSelect'
import useSWR from 'swr'
import { convertToBase64 } from '../../../util/base64'
import { v4 as uuidv4 } from 'uuid';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { setCode } from '../../../redux/productSlice'
import { useDispatch } from 'react-redux';

const addProduct = () => {
    const router = useRouter()
    const refContainer = useRef(null);
    const dispatch = useDispatch();
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

    const [referenceName, setReferenceName] = useState([])

    const productTypeDropdown = [
        { label: 'Select Product Type', value: '' },
        { label: 'Bulk', value: 'BULK' },
        { label: 'Single', value: 'SINGLE' },
        { label: 'Both', value: 'BOTH' },
    ]

    const materialTypeDropdown = [
        { label: 'Select Material Type', value: '' },
        { label: 'Row', value: 'ROW' },
        { label: 'Finished', value: 'FINISHED' },
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
            // console.log(payload)
            if (payload.materialType === "" || payload.materialType === undefined ||
                payload.category.categoryCode === "" || payload.category.categoryCode === undefined ||
                payload.productType === "" || payload.productType === undefined) {
                toast.error("Please select all the mandatory fields")
                return false
            }
            const response = await api.saveProduct(payload)
            setIsLoading(true)
            if (response && response.data) {
                toast.success(response.message)
                setIsLoading(false)
                resetForm()
                console.log(response)
                dispatch(setCode(response.data.productCode))
                setTimeout(() => {
                    router.push('/seller/products/add-product-variant')
                }, 1000);
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
            // productImages: [productImage]
        }
        return formData
    }


    const handleFirstCategoryChange = (value) => {
        if (value.value !== "") {
            fetchData(value)
        }
        setStoreId(v => [...v, value.value])
        setFormData([])
    }

    let r = [];
    const handleCategoryChange = async (e) => {
        const [name, value] = e.target;
        setStoreId(v => [...v, value.value])
        fetchData(value);

        r.push(refContainer.current.name)
        let checkCat = hasDuplicates(r)
        if (checkCat) {
            //    empty the array
            alert("You can't change the category again to do so please change the category")
            r = []
            setFormData([])
        }
    }
    function hasDuplicates(array) {
        var valuesSoFar = [];
        for (var i = 0; i < array.length; ++i) {
            var value = array[i];
            if (valuesSoFar.indexOf(value) !== -1) {
                return true;
            }
            valuesSoFar.push(value);
        }
        return false;
    }


    const fetchData = async (value) => {
        const response = await api.getAllSubCategories(value.value)
        let dropdownData = []

        if (response && response.data.length > 0) {
            response.data.map(d => {
                dropdownData.push({
                    "value": d.categoryCode,
                    "label": d.categoryName
                })
            })
            setFormData(currentArray => {
                return [...currentArray, getDropdownValue(dropdownData, value.label)]
            })

        }
        else {
            const res = await api.getBrandDetailsByCode(value.value)
            const data = getBrandOptionValue(res)
            setBrandOptions(data)
        }
    }


    function getDropdownValue(dynamicOption, label = "Select Sub Category") {

        return (
            <div className='col-md-3' key={uuidv4()}>
                <div className="form-group">
                    <label htmlFor="input-field">Select from {label}</label>
                    <select className="form-control form-control-sm" name={label} ref={refContainer} onChange={handleCategoryChange}>
                        <option>--Select--</option>
                        {dynamicOption.map((d, i) => {
                            return (
                                <option key={i} value={d.value}>{d.label}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        )
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
    // TODO: append image to the product
    const [image, setImage] = useState([{ images: "" }])

    const addMoreImage = () => {
        setImage([...image, { images: "" }])
    }

    let handleFileUpload = async (i, e) => {

        let newFormValues = [...image];
        newFormValues[i][e.target.name] = e.target.value;
        let file = e.target.files[0];
        const base64 = file ? await convertToBase64(file) : "";
        setImage(newFormValues);
        setProductImage({ ...productImage, ["image" + i]: base64 });
    }
    let removeImage = (i) => {
        let newFormValues = [...image];
        newFormValues.splice(i, 1);
        setImage(newFormValues)
    }

    return (
        <>
            <PageLayout>
                <PageName title="Add Product" />

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Add Product</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className='col-md-3'>
                                            <CustomSelect
                                                isMulti={false}
                                                onChange={handleFirstCategoryChange}
                                                options={options}
                                                name="categoryMap"
                                                label={`Select from Category`}
                                                required={true}
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
                                                required={true}
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <CustomSelect
                                                isMulti={false}
                                                onChange={(value) => setMaterialType(value)}
                                                options={materialTypeDropdown}
                                                name="materialType"
                                                label="Material Type"
                                                required={true}
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
                                                required={true}
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
                                                required={true}
                                            />
                                        </div>

                                        {/* <div className='col-md-4' style={{ display: "flex" }}>
                                            <div className='col-md-10'>
                                                <div className='form-group'>
                                                    <label htmlFor="input-field">Upload Category Image</label>
                                                    <input type="file" name='categoryImage' accept="image/x-png,image/gif,image/jpeg" multiple className="form-control form-control-sm" id="input-field" placeholder="Enter Category" onChange={(e) => handleFileUpload(e)} />
                                                </div>
                                            </div>
                                            <div className='col-md-2'>
                                                <button type="button" className="btn btn-warning btn-sm" style={{ marginTop: " 33px" }} onClick={() => addMoreImage()}>
                                                    <AiOutlinePlus />
                                                </button>
                                            </div>
                                        </div> */}

                                        {
                                            image.map((element, index) => (
                                                <div className='col-md-4' style={{ display: "flex" }} key={index}>
                                                    <div className='col-md-10'>
                                                        <div className='form-group'>
                                                            <label htmlFor="input-field" className='required'>Upload Category Image</label>
                                                            <input type="file" name='categoryImage' accept="image/x-png,image/gif,image/jpeg" className="form-control form-control-sm" id="input-field" placeholder="Enter Category" onChange={e => handleFileUpload(index, e)} />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-2'>
                                                        {index === 0 ?
                                                            <button type="button" className="btn btn-warning btn-sm" style={{ marginTop: " 33px" }} onClick={() => addMoreImage()}>
                                                                <AiOutlinePlus />
                                                            </button>

                                                            : <button type="button" className="btn btn-danger btn-sm" style={{ marginTop: " 33px" }} onClick={() => removeImage(index)}>
                                                                <AiOutlineMinus />
                                                            </button>}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='row mt-4 center'>
                                        <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Next</button>
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