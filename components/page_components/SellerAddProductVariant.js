import { InputField, CustomSelect } from '../index'

import * as api from '../../services/productApi'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


function SellerAddProductVariant({ handleNext, handleBack }) {

    const router = useRouter();

    const [data, setData] = useState([])
    const [formData, setFormData] = useState([])
    const [attr, setAttr] = useState([])

    const { productCode } = useSelector(state => state.product)
    console.log("productCode", productCode)



    useEffect(() => {
        async function fetchDataByCode() {
            if (productCode) {
                const response = await api.getAllProductVariant(productCode)
                setData(response)
            } else {
                // FIXME: in else case, redirect to home page
                const response = await api.getAllProductVariant("PRODEE174")
                console.log('response', response)
                setData(response)
            }
        }
        fetchDataByCode()
    }, [])

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            prodCode: productCode || 'PRODTE212',
            variantValue: JSON.stringify(formData),
        }
        console.log(data)
        const response = await api.addProductVariantAttribute(data)
        console.log(response)
        if (response && response.data) {
            toast.success(response.message)
            setTimeout(() => {
                router.push('/seller/products/add-product')
            }, 1000);
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



    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className='card-title'>
                            <h4>Add Product Variants</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                {
                                    data?.map((item, index) => {

                                        return (
                                            <div className='row' key={index}>
                                                <div className='col-md-12'>
                                                    <h3>Attribute Code : <span style={{ color: "red" }}>{item.attributeCode}</span></h3>
                                                </div>

                                                <div className='col-md-12 center' style={{ backgroundColor: "#7ddfbe" }}>
                                                    <h5>Attribute Description : <span>{item.attributeDesc}</span></h5>
                                                </div>

                                                <div className='col-md-3 center'>
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
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </> : item.attributeFields.formType === 'dropdown' ?
                                                                <>
                                                                    <div className='col-md-3'>
                                                                        <select className="form-control form-control-sm" name={item.attributeName} onChange={(e) => handleInputChange(e, index, item.attributeName)}>
                                                                            <option value="">Select</option>
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

export default SellerAddProductVariant