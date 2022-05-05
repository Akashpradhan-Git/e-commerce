import Layout from '../../../components/layout/pageLayout'
import PageName from '../../../components/page_components/PageName'
import MainLayout from '../../../components/layout/main'
import InputField from '../../../components/form-element/InputField'
import * as api from '../../../services/masterApi'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react';
import Spinner from '../../../components/util/Spinner'


function addProduct() {
    const [isLoading, setIsLoading] = useState(false); // loading state
    const [type, setType] = useState({
        categoryName: "",
        attribute: "",
        formType: "",
        noOfFields: "",
    });
    const [dynamicField, setDynamicField] = useState([]);
    const [formData, setFormData] = useState(null)

    const handleChange = (e) => {
        setType({
            ...type,
            [e.target.name]: e.target.value
        })
    }



    // const handleDynamicField = (e) => {
    //     setDynamicField(prv => [...prv, { [e.target.name]: e.target.value }])
    //     console.log(dynamicField.length)
    // }



    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        // const list = dynamicField ? [...dynamicField] : [];
        // list[index][name] = value;
        // setDynamicField(list); 
        setDynamicField(prv => [...prv, { [e.target.name]: e.target.value }])
    };

    const handleBlur = (e, index) => {
        const { name, value } = e.target;
        console.log(value)
        setDynamicField(prv => [...prv, { [e.target.name]: e.target.value }])
    };


    console.log("dynamicField", dynamicField)



    const category = [
        {
            value: '1',
            label: 'Category 1'
        },
        {
            value: '2',
            label: 'Category 2'
        },
        {
            value: '3',
            label: 'Category 3'
        },
    ]

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
        for (let i = 0; i < type.noOfFields; i++) {
            if (type.formType === 'input') {
                fields.push(
                    <div className='col-md-3' key={i}>
                        <div className="form-group">
                            <label htmlFor="input-field">{`field${i}`}</label>
                            <input type='text' className="form-control form-control-sm" name={`field${i}`} onBlur={handleBlur} />
                        </div>
                    </div>
                )
            }
            if (type.formType === 'dropdown') {
                fields.push(
                    <div className='col-md-3' key={i}>
                        <InputField name={`field${i + 1}`} type="text" label={`Field ${i + 1}`} placeholder={`field${i + 1}`} value="" onChange={handleDynamicField} />
                    </div>
                )
            }
            if (type.formType === 'file') {
                fields.push(
                    <div className='col-md-3' key={i}>
                        <InputField name={`field${i + 1}`} type="file" label={`Field ${i + 1}`} placeholder={`field${i + 1}`} value="" onChange={handleDynamicField} />
                    </div>
                )
            }
            if (type.formType === 'date') {
                fields.push(
                    <div className='col-md-3' key={i}>
                        <InputField name={`field${i + 1}`} type="date" label={`Field ${i + 1}`} placeholder={`field${i + 1}`} value="" onChange={handleDynamicField} />
                    </div>
                )
            }
        }
        setFormData(fields)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //  setIsLoading(true);
        const formData = {
            categoryName: type.categoryName,
            attribute: type.attribute,
            formType: type.formType,
            noOfFields: type.noOfFields,
            dynamicField: dynamicField
        }
        console.log(formData)
    }

    if (isLoading) return <Spinner />

    return (
        <>
            <Head>
                <title>Add Country</title>
            </Head>

            <Layout>
                <PageName title="Add Country" />

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Add Country</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <div className="form-group">
                                                <label htmlFor="input-field">Select Category</label>
                                                <select name="categoryName" className='form-control form-control-sm' onChange={handleChange}>
                                                    <option value="">Select Category</option>
                                                    {category.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.value}>{item.label}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
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
                                                error={type.attribute && type.attribute.length > 0 ? null : "Attribute is required"}
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

                                        <div className='col-md-3'>
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
                                    </div>
                                    <div className='row mt-4 center'>
                                        <button type="button" className="btn btn-primary" onClick={generateFields}>Generate</button>
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
            </Layout>

        </>
    )
}
addProduct.Layout = MainLayout;

export default addProduct