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
import CustomSelect from '../../../components/form-element/CustomSelect'
import useSWR from 'swr'

function addProductBrand() {
    const [isLoading, setIsLoading] = useState(false); // loading state
    const [categoryMap, setCategoryMap] = useState("")
    //* get all category list
    const { data } = useSWR('/product-master/get-all-p-categories', api.getProductCategory);

    const options = []
    if (data) {
        data.map(d => {
            options.push({
                "value": d.categoryId,
                "label": d.categoryName
            })
        })
    }

    const formik = useFormik({
        initialValues: {
            brandName: "",
            brandDescription: "",
        },
        validationSchema: Yup.object({
            brandName: Yup.string().required('Brand Name is required'),
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


    return (
        <>
            <Head>
                <title>Add Product Brand</title>
            </Head>
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
                                                onChange={(value) => setCategoryMap(value)}
                                                options={options}
                                                name="categoryMap"
                                                label="Select Category"
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.brandName}
                                                placeholder="Brand Name"
                                                label="Brand Name"
                                                name="brandName"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.brandName && formik.touched.brandName ? formik.errors.brandName : null}
                                            />
                                        </div>

                                        <div className='col-md-4'>
                                            <InputField
                                                type="text"
                                                value={formik.values.brandDescription}
                                                placeholder="Brand Description"
                                                label="Brand Description"
                                                name="brandDescription"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.brandDescription && formik.touched.brandDescription ? formik.errors.brandDescription : null}
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
addProductBrand.Layout = MainLayout
export default addProductBrand