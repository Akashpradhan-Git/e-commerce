import { useSelector } from 'react-redux'
import { InputField, CustomSelect } from '../index'
import { convertToBase64 } from '../../util/base64'

import * as api from '../../services/productApi'
import { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { toast } from 'react-toastify'

const AddAttributes = ({ handleBack }) => {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState([])
    const [attr, setAttr] = useState([])
    const [attributeImage, setAttributeImage] = useState([])

    const { categoryCode } = useSelector(state => state.product)
    const { productCode } = useSelector(state => state.product)
    useEffect(() => {
        async function fetchDataByCode() {
            if (categoryCode) {
                const response = await api.getAllProductCategoryAttribute(categoryCode)
                setData(response)
            } else {
                alert('Please select category first')
            }
        }
        fetchDataByCode()
    }, [])


    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            product: { productCode: productCode },
            variantSkuCode: null,
            variantData: JSON.stringify(formData),
            variantImages: attributeImage
        }
        const response = await api.addProductAttribute(data)
        if (response && response.data) {
            toast.success(response.message)
        }
        else {
            toast.error("Something went wrong")
        }

    }



    const handleInputChange = (e, index, l) => {
        const { name, value } = e.target;
        // set value as per dynamic key name

        setFormData(prevState => {
            return {
                ...prevState,
                [l]: {
                    ...prevState[l],
                    [name]: value
                }
            }
        })
    };


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

        setAttributeImage([...attributeImage, base64]);
    }
    let removeImage = (i) => {
        let newFormValues = [...image];
        newFormValues.splice(i, 1);
        setImage(newFormValues)
    }
    return (
        <>

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className='card-title'>
                            <h4>Add Product Attribute</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                {
                                    data?.map((item, index) => {
                                        return (
                                            <div className='row' key={index}>

                                                <div className='col-md-12 center' style={{ backgroundColor: "#d3d3d3", padding: " 0.3rem" }}>
                                                    <h5>Attribute Category: <span>{item.attributeDesc.toUpperCase()}</span></h5>

                                                </div>

                                                <div className='col-md-3 center' style={{ borderRight: "1px solid lightgrey" }}>
                                                    <h5>Attribute Name : <span>{item.attributeName}</span></h5>
                                                </div>

                                                <div className='col-md-9 mt-4'>
                                                    <div className='row'>
                                                        {
                                                            item.attributeFields.formType === 'input' ? <>
                                                                {
                                                                    item.attributeFields.dynamicFields.map((dyValue, index) => {

                                                                        return (

                                                                            <div className='col-md-3' key={index}>
                                                                                <InputField
                                                                                    type="text"
                                                                                    value={formData[dyValue.attributeCode]}
                                                                                    placeholder={dyValue.input}
                                                                                    name={dyValue.input}
                                                                                    required={true}
                                                                                    onChange={(e) => handleInputChange(e, index, item.attributeName)}
                                                                                />
                                                                                {/* <input type="hidden" name={item.attributeName} value={item.isVariant} /> */}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </> : item.attributeFields.formType === 'dropdown' ?
                                                                <>
                                                                    <div className='col-md-5'>
                                                                        <select className="form-control form-control-sm" name={item.attributeName} onChange={(e) => handleInputChange(e, index, item.attributeName)}>
                                                                            <option value="">--Select--</option>
                                                                            {
                                                                                item.attributeFields.dynamicFields.map((dyValue, index) => {
                                                                                    return (
                                                                                        <option value={dyValue.input} key={index}>{dyValue.input}</option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                </> : ""

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='row mt-4'>
                                    <div className='col-md-12 center mb-2' style={{ backgroundColor: "#d3d3d3", padding: " 0.3rem" }}>
                                        <h5>Attribute Image </h5>
                                    </div>
                                    {
                                        image.map((element, index) => (
                                            <div className='col-md-4' style={{ display: "flex" }} key={index}>
                                                <div className='col-md-10'>
                                                    <div className='form-group'>
                                                        <label htmlFor="input-field" className='required'>Upload Category Image {index + 1}</label>
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
                                    <button type="submit" className="btn btn-sm btn-primary" onClick={handleSubmit}>Submit</button>
                                    <button type="button" className="btn btn-sm btn-danger ml-2" onClick={handleBack}>Back</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddAttributes