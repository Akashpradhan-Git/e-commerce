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
import { convertToBase64 } from '../../../util/base64'


const addProductCategory = () => {

    const [loading, setLoading] = useState(false)
    const [postImage, setPostImage] = useState({
        categoryImage: "",
    });
    const [isHeader, setIsHeader] = useState(false); // loading state




    const [categoryMap, setCategoryMap] = useState("")


    //* get all category list
    const { data, error, isError, mutate } = useSWR('/product-master/get-all-p-categories', api.getProductCategory);


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ categoryImage: base64 });
    };


    const formik = useFormik({
        initialValues: {
            categoryName: '',
            categoryDescription: '',
        },
        validationSchema: Yup.object({
            categoryName: Yup.string().required('Category Name is required'),
            categoryDescription: Yup.string().required('Description is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const data = categoryData(values)
            setLoading(true)
            const response = await api.saveProductCategory(data)
            if (response && response.data) {
                setLoading(false)
                toast.success(response.message)
                resetForm()
                mutate()
            } else {
                setLoading(false)
                toast.error('Something went wrong')
            }
        }
    })

    const categoryData = (values) => {
        const data = {
            ...values,
            isHeader,
            categoryImage: postImage.categoryImage,
            parentCategoryId: categoryMap.value ? categoryMap.value : null
        }
        return data
    }

    const handleCheckbox = (e) => {
        setIsHeader(e.target.checked)
    }



    const options = []
    if (data) {
        data.map(d => {
            options.push({
                "value": d.categoryId,
                "label": d.categoryName
            })
        })
    }
    if (loading)
        return <Spinner />

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
                                                <input type="text" name='categoryName' className="form-control form-control-sm" id="input-field" placeholder="Enter Category" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                {formik.touched.categoryName && formik.errors.categoryName ? (
                                                    <small className="error-message text-danger">{formik.errors.categoryName}</small>
                                                ) : null}
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
                                                <label htmlFor="input-field">Upload Category Image</label>
                                                <input type="file" name='categoryImage' className="form-control form-control-sm" id="input-field" placeholder="Enter Category" onChange={(e) => handleFileUpload(e)} />
                                            </div>
                                        </div>

                                        <div className='col-md-2'>
                                            <label htmlFor="input-field">Is Header</label>
                                            <div className="onoffswitch">
                                                <input type="checkbox" name="isHeader" className="onoffswitch-checkbox" id="myonoffswitch" tabIndex="0" onChange={handleCheckbox} />
                                                <label className="onoffswitch-label" htmlFor="myonoffswitch">
                                                    <span className="onoffswitch-inner"></span>
                                                    <span className="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className='col-md-4'>
                                            <div className='form-group'>
                                                <label htmlFor="input-field">Category Description</label>
                                                <input type="text" name='categoryDescription' className="form-control form-control-sm" id="input-field" placeholder="Enter Category" onChange={formik.handleChange} />
                                                {formik.touched.categoryDescription && formik.errors.categoryDescription ? (
                                                    <small className="error-message text-danger">{formik.errors.categoryDescription}</small>
                                                ) : null}

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
addProductCategory.Layout = MainLayout;
export default addProductCategory