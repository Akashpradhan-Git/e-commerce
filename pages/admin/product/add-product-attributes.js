import Layout from '../../../components/layout/pageLayout'
import PageName from '../../../components/page_components/PageName'
import MainLayout from '../../../components/layout/main'
import InputField from '../../../components/form-element/InputField'
import * as api from '../../../services/productApi'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react';
import Spinner from '../../../components/util/Spinner'
import useSWR from 'swr'
import CustomSelect from '../../../components/form-element/CustomSelect'

function addProductAttribute() {
    const [isLoading, setIsLoading] = useState(false); // loading state
    const [isVariant, setIsVariant] = useState(false); // loading state
    const [type, setType] = useState({
        attribute: "",
        formType: "",
        noOfFields: "",
        description: "",
    });

    const [categoryName, setCategoryName] = useState("")
    const [dynamicFields, setDynamicFields] = useState([]);
    const [formData, setFormData] = useState(null)

    const { data, error, isError, mutate } = useSWR('/product-master/get-all-p-categories', api.getProductCategory);
    // console.log(error.response.status)

    console.log(data, error, isError)



    const options = []
    if (data) {
        data.map(d => {
            options.push({
                "value": d.categoryId,
                "label": d.categoryName
            })
        })
    }

    const handleChange = (e) => {
        setType({
            ...type,
            [e.target.name]: e.target.value
        })
    }


    const handleCheckbox = (e) => {
        setIsVariant(e.target.checked)
    }

    const handleBlur = (e, index) => {
        setDynamicFields(prv => [...prv, { [e.target.name]: e.target.value }])
    };

    const formTypeData = [
        {
            value: 'input',
            label: 'Input'
        },
        {
            value: 'dropdown',
            label: 'Dropdown'
        },
        {
            value: 'file',
            label: 'File'
        },
        {
            value: 'date',
            label: 'Date'
        },
    ]

    const generateFields = () => {
        const fields = []
        for (let i = 1; i <= type.noOfFields; i++) {
            if (type.formType === 'input') {
                fields.push(
                    <div className='col-md-3' key={i}>
                        <div className="form-group">
                            <label htmlFor="input-field">{`Type of Category ${i}`}</label>
                            <input type='text' className="form-control form-control-sm" placeholder='Placeholder Name' name={`input${i}`} onBlur={handleBlur} />
                        </div>
                    </div>
                )
            }
            if (type.formType === 'dropdown') {
                fields.push(
                    <div className='col-md-3' key={i}>
                        <InputField name={`field${i + 1}`} type="text" label={`Field ${i + 1}`} placeholder={`field${i + 1}`} value="" onChange={handledynamicFields} />
                    </div>
                )
            }
            if (type.formType === 'file') {
                fields.push(
                    <div className='col-md-3' key={i}>
                        <InputField name={`field${i + 1}`} type="file" label={`Field ${i + 1}`} placeholder={`field${i + 1}`} value="" onChange={handledynamicFields} />
                    </div>
                )
            }
            if (type.formType === 'date') {
                fields.push(
                    <div className='col-md-3' key={i}>
                        <InputField name={`field${i + 1}`} type="date" label={`Field ${i + 1}`} placeholder={`field${i + 1}`} value="" onChange={handledynamicFields} />
                    </div>
                )
            }
        }
        setFormData(fields)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = categoryData()
        setIsLoading(true)
        if (type.attribute === '' || type.formType === '' || type.noOfFields === '' || type.description === '' && !isVariant && categoryName === '') {
            toast.error("Please fill all the fields")
            setIsLoading(false)
            return
        }
        const res = await api.saveCategoryAttribute(data)
        if (res && res.data) {
            toast.success("Category Attribute added successfully")
            setIsLoading(false)
        }
    }

    const categoryData = () => {
        const formData = {
            category: { categoryId: categoryName.value },
            attributeName: type.attribute,
            attributeDesc: type.description,
            isVariant,
            attributeFields: JSON.stringify({
                dynamicFields,
                attributeName: type.attribute,
                formType: type.formType,
                noOfFields: type.noOfFields,
                attributeDesc: type.description,
                isVariant,
            })
        }
        return formData
    }

    if (isError && error) {
        toast.error("Something went wrong")
    }

    if (isLoading) return <Spinner />

    return (
        <>
            <Head>
                <title>Add Attribute</title>
            </Head>

            <Layout>
                <PageName title="Add Attribute" />

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Add Attribute</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <CustomSelect
                                                isMulti={false}
                                                onChange={(value) => setCategoryName(value)}
                                                options={options}
                                                name="categoryName"
                                                label="Select Category"
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                placeholder="Attribute"
                                                label="Attribute"
                                                name="attribute"
                                                value={type.attribute}
                                                onChange={handleChange}
                                                onBlur={handleChange}
                                                error={type.attribute && type.attribute.length > 0 ? null : "attribute is required"}
                                            />
                                        </div>

                                        <div className='col-md-2'>
                                            <label htmlFor="input-field">Is Variant</label>
                                            <div className="onoffswitch">
                                                <input type="checkbox" name="isVariant" className="onoffswitch-checkbox" id="myonoffswitch" tabIndex="0" onChange={handleCheckbox} />
                                                <label className="onoffswitch-label" htmlFor="myonoffswitch">
                                                    <span className="onoffswitch-inner"></span>
                                                    <span className="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <InputField
                                                type="text"
                                                placeholder="Attribute"
                                                label="Description"
                                                name="description"
                                                value={type.description}
                                                onChange={handleChange}
                                                onBlur={handleChange}
                                                error={type.description && type.description.length > 0 ? null : "description is required"}
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <div className="form-group">
                                                <label htmlFor="input-field">Select Category</label>
                                                <select name="formType" className='form-control form-control-sm' onChange={handleChange}>
                                                    <option value="">Select Category</option>
                                                    {formTypeData.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.value}>{item.label}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className='col-md-2'>
                                            <InputField
                                                type="text"
                                                placeholder="No Of Fields"
                                                label="No Of Fields"
                                                name="noOfFields"
                                                value={type.noOfFields}
                                                onChange={handleChange}
                                                onBlur={handleChange}
                                                error={type.noOfFields && type.noOfFields.length > 0 ? null : "No Of Fields is required"}
                                            />
                                        </div>

                                        <button type="button" className="btn btn-warning btn-sm custom-height" onClick={generateFields}>Generate</button>
                                        <style jsx>{`
                                            .custom-height {
                                            height: 30px;
                                            margin-top: 33px;
                                            }
                                        `}</style>
                                    </div>

                                    <div className='row'>
                                        {
                                            formData ? formData : null
                                        }
                                    </div>
                                    <div className='row mt-4 center'>
                                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >

        </>
    )
}
addProductAttribute.Layout = MainLayout;

export default addProductAttribute