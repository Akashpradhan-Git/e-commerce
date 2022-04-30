import PageLayout from '../../../components/layout/pageLayout'
import PageName from '../../../components/page_components/PageName'
import MainLayout from '../../../components/layout/main'
import InputField from '../../../components/form-element/InputField'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function countryMaster() {

    const formik = useFormik({
        initialValues: {
            countryName: "",
        },
        validationSchema: Yup.object({
            countryName: Yup.string().required('Country Name is required'),
        }),
        onSubmit: async values => {
            console.log(values);
        },
    });
    return (
        <>
            <Head>
                <title>Add Country</title>
                <meta name="description" content="View Single user in e-commerces application" />
                <link rel="icon" href="/favicon.ico" />
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
                                                placeholder="City Name"
                                                label="City Name"
                                                name="cityName"
                                                value={formik.values.cityName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.cityName && formik.touched.cityName ? formik.errors.cityName : null}
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

countryMaster.Layout = MainLayout;
export default countryMaster