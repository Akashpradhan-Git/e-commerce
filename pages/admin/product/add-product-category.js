import PageLayout from '../../../components/layout/pageLayout'
import PageName from '../../../components/page_components/PageName'
import MainLayout from '../../../components/layout/main'
import InputField from '../../../components/form-element/InputField'
import * as api from '../../../services/productApi'
import Spinner from '../../../components/util/Spinner'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import CustomSelect from '../../../components/form-element/CustomSelect'
import useSWR from 'swr'

const addProductCategory = () => {

    const [loading, setLoading] = useState(false)
    const [categoryMap, setCategoryMap] = useState(null)
    const [category, setCategory] = useState({
        categoryName: '',
        categoryImage: '',
        categoryDescription: '',
    })

    //* get all category list
    const { data, error, isError, mutate } = useSWR('/product-master/get-all-p-categories', api.getProductCategory);

    console.log(data)
    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedCategory = {
            ...category,
            parentCategory: {
                categoryId: categoryMap.value
            }
        }
        const response = await api.saveProductCategory(updatedCategory)
        console.log(response)
        setLoading(true)
    }

    // Select Options
    const options = []
    if (data) {
        data.map(d => {
            options.push({
                "value": d.categoryId,
                "label": d.categoryName
            })
        })
    }


    return (
        <>
            <Head>
                <title>Add Product Category</title>
            </Head>
            <PageLayout>
                <PageName title="Add Product Category" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Add Product Category</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <div className='form-group'>
                                                <label htmlFor="input-field" className='required'>Add Category</label>
                                                <input type="text" name='categoryName' className="form-control form-control-sm" id="input-field" placeholder="Enter Category" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <CustomSelect
                                                isMulti={false}
                                                onChange={(value) => setCategoryMap(value)}
                                                options={options}
                                                name="categoryMap"
                                                label="Add Category Map"
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <div className='form-group'>
                                                <label htmlFor="input-field">Category Description</label>
                                                <input type="text" name='categoryImage' className="form-control form-control-sm" id="input-field" placeholder="Enter Category" onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className='col-md-3'>
                                            <div className='form-group'>
                                                <label htmlFor="input-field">Upload Category Image</label>
                                                <input type="file" name='categoryImage' className="form-control form-control-sm" id="input-field" placeholder="Enter Category" onChange={handleChange} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='row mt-4 center'>
                                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
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
addProductCategory.Layout = MainLayout;
export default addProductCategory