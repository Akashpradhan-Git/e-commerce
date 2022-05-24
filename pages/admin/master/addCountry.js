import { PageLayout, PageName, MainLayout, InputField, Spinner } from '../../../components/index'
import * as api from '../../../services/masterApi'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react';


function addCountry() {
    const [isLoading, setIsLoading] = useState(false); // loading state

    const formik = useFormik({
        initialValues: {
            countryName: "",
        },
        validationSchema: Yup.object({
            countryName: Yup.string().required('Country Name is required'),
        }),

        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true)
            const response = await api.saveCountry(values)
            if (response.data) {
                setIsLoading(false)
                toast.success("Country Added Successfully")
                resetForm();
            } else {
                setIsLoading(false)
                toast.error("Role not saved")
            }
        },
    });

    if (isLoading) return <Spinner />

    return (
        <>
            <Head>
                <title>Add Country</title>
            </Head>

            <PageLayout>
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
                                            <InputField
                                                type="text"
                                                placeholder="Country Name"
                                                label="Country Name"
                                                name="countryName"
                                                value={formik.values.countryName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.countryName && formik.touched.countryName ? formik.errors.countryName : null}
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
addCountry.Layout = MainLayout;

export default addCountry