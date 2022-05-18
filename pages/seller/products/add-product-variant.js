import PageName from '../../../components/page_components/PageName'
import PageLayout from '../../../components/layout/pageLayout'
import MainLayout from '../../../components/layout/main'
import InputField from '../../../components/form-element/InputField'
import * as api from '../../../services/productApi'

import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const addProductVariant = () => {
  const router = useRouter();

  const [data, setData] = useState([])
  const [formData, setFormData] = useState([])
  const [attr, setAttr] = useState([])

  const { productCode } = useSelector(state => state.product)
  useEffect(() => {
    async function fetchDataByCode() {
      if (productCode) {
        // get data from api
        // console.log('productCode', productCode)
        const response = await api.getAllProductVariant(productCode)
        setData(response)
        setAttr(response.map(item => item.attributeName))
      } else {
        const response = await api.getAllProductVariant("PRODMI713")
        setData(response)

        setAttr(response.map(item => { item.attributeFields.attributeName }))
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
      <PageLayout>
        <PageName title="Add Product Variants" />

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
                                    <h2>Dropdown</h2>
                                  </> : ""

                              }
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className='row mt-4 center'>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={() => router.back()}>Cancel</button>
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

addProductVariant.Layout = MainLayout;
export default addProductVariant
