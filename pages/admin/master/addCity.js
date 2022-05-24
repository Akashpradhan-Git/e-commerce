import { PageLayout, PageName, MainLayout, InputField, CustomSelect } from '../../../components/index'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import useSWR from 'swr'
import * as Yup from 'yup'
import * as api from '../../../services/masterApi'
import { useState } from 'react'
import swal from 'sweetalert';

function city() {
    const [regionCode, setRegionCode] = useState([])
    const [isLoading, setIsLoading] = useState(false); // loading state

    const { data: state } = useSWR('/state/get-all-states', api.getStateList);

    // Select Options
    const options = []
    if (state) {
        state.map(d => {
            options.push({
                "value": d.regionCode,
                "label": d.region
            })
        })
    }


    function onChangeInput(value) {
        setRegionCode(value)
    }


    const formik = useFormik({
        initialValues: {
            cityName: "",
            cityCode: "",

        },
        validationSchema: Yup.object({
            cityName: Yup.string().required('City Name is required'),
            cityCode: Yup.string().required('Region Code is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (regionCode.length === 0) {
                toast.error('Please select State')
                return
            }
            const data = saveCity(values)
            const response = await api.saveCity(data)
            setIsLoading(true)
            if (response.data) {
                swal({
                    title: "Good job!",
                    text: `${response.message}`,
                    icon: "success",
                    button: "Ok",
                });
                setIsLoading(false)
                resetForm();
            }
            else {
                setIsLoading(false)
                toast.error("Something went wrong")
            }
        },
    });


    function saveCity(values) {
        let stateData = { ...values, regionCode: regionCode.value }
        return stateData
    }

    return (
        <>
            <Head>
                <title>Add City</title>
                <meta name="description" content="View Single user in e-commerces application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <PageName title="Add City" />

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Add City</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className='row'>

                                        <div className='col-md-3'>
                                            <CustomSelect
                                                isMulti={false}
                                                onChange={onChangeInput}
                                                options={options}
                                                name="state"
                                                label="Choose a State"
                                            />
                                        </div>

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
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.cityCode}
                                                placeholder="City Code"
                                                label="City Code"
                                                name="cityCode"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.cityCode && formik.touched.cityCode ? formik.errors.cityCode : null}
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

city.Layout = MainLayout;
export default city