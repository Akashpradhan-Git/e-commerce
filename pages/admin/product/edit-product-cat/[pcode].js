import Head from 'next/head'
import { PageLayout, PageName, MainLayout, InputField, Spinner, CustomSelect } from '../../../../components/index'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import * as api from '../../../../services/productApi'
import { useFormik } from 'formik'
import { useState } from 'react';

function editProductCat() {
    const router = useRouter()
    const productCode = router.query.pcode;
    const { isLoading, isError, data } = useSWR(['/productCatById', productCode], () => api.getProductCategoryById(productCode))
    const { data: catMap } = useSWR('/product-master/get-all-p-categories', api.getProductCategory);

    if (isError) {
        toast.warn("failed to load")
    }

    const options = []
    if (catMap && catMap.length > 0) {
        catMap.map(d => {
            options.push({
                "value": d.categoryId,
                "label": d.categoryName
            })
        })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            categoryName: data?.categoryName || "",
            categoryDescription: data?.categoryDescription || "",
            isHeader: data?.isHeader || "",
            categoryImage: data?.categoryImage || "",
            categoryCode: data?.categoryCode || "",
            parentCategoryId: data?.parentCategoryId || null,
        },
        onSubmit: values => {
            try {
                const res = api.updateRole(values)
                console.log(res)
            } catch (error) {

            }
        }
    });

    if (!data) return <Spinner />

    return (
        <>
            <Head>
                <title>Edit User</title>
                <meta name="description" content="Edit Single user in e-commerces application" />
            </Head>

            <PageLayout>
                <PageName title="Edit User" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Edit User</h4>
                            </div>
                            <div className="card-body">
                                <form >
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <InputField
                                                label="Category Code"
                                                name="categoryCode"
                                                value={formik.values.categoryCode}
                                                type="text"
                                                placeholder="Enter Category Name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                readonly="readonly"
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                label="Category Name"
                                                name="categoryName"
                                                value={formik.values.categoryName}
                                                type="text"
                                                placeholder="Enter Category Name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <CustomSelect
                                                label="Parent Category"
                                                name="parentCategoryId"
                                                defaultValue={formik.values.parentCategoryId !== null ? formik.values.parentCategoryId : null}
                                                options={options}
                                                onChange={(e) => (formik.setFieldValue('parentCategoryId', e.value))}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                label="Category Description"
                                                name="categoryDescription"
                                                value={formik.values.categoryDescription}
                                                type="text"
                                                placeholder="Enter Category Name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-md-2'>
                                            <label htmlFor="input-field">Is Header</label>
                                            <div className="onoffswitch">
                                                <input type="checkbox" name="isHeader" className="onoffswitch-checkbox" id="myonoffswitch" tabIndex="0" value={formik.values.isHeader} onChange={formik.handleChange} checked={formik.values.isHeader ? 'checked' : ""} />
                                                <label className="onoffswitch-label" htmlFor="myonoffswitch">
                                                    <span className="onoffswitch-inner"></span>
                                                    <span className="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div className='form-group'>
                                                <label htmlFor="input-field">Upload Category Image</label>
                                                <input type="file" name='categoryImage' className="form-control form-control-sm" id="input-field" placeholder="Enter Category" onChange={(e) => handleFileUpload(e)} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='row mt-4 center'>
                                        <button type="submit" className="btn btn-sm btn-primary" onClick={formik.handleSubmit}>Submit</button>
                                        <button type="button" className="btn btn-sm btn-danger ml-2" onClick={() => router.back()}>Cancel</button>
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
editProductCat.Layout = MainLayout;

export default editProductCat