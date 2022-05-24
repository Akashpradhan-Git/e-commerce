import { PageLayout, PageName, MainLayout, InputField, CustomSelect, Spinner } from '../../../components/index'

import Head from 'next/head'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useSWR from 'swr'
import { useState } from 'react'
import * as api from '../../../services/masterApi'

function addState() {
    const [option, setOption] = useState([])
    const [isLoading, setIsLoading] = useState(false); // loading state

    function onChangeInput(value) {
        setOption(value)
    }


    const { data, error, isError } = useSWR('/country/get-all-countries', api.getCountryList);
    const { data: state, mutate } = useSWR('/state/get-all-states', api.getStateList);


    // Select Options
    const options = []
    if (data) {
        data.map(d => {
            options.push({
                "value": d.countryCode,
                "label": d.countryName
            })
        })
    }

    const formik = useFormik({
        initialValues: {
            region: "",
            gstCode: "",
        },
        validationSchema: Yup.object({
            region: Yup.string().required('City Name is required'),
            gstCode: Yup.string().required('Region Code is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (option.length === 0) {
                toast.error('Please select country')
                return
            }
            setIsLoading(true)
            const data = saveState(values)
            const response = await api.saveState(data)

            if (response) {
                toast.success("State Added Successfully")
                setIsLoading(false)
                resetForm();
                mutate()
            }
            else {
                setIsLoading(false)
                toast.error("Something went wrong")
            }

        },
    });

    //* Save State
    function saveState(values) {
        let stateData = { ...values, countryCode: option.value }
        return stateData
    }

    if (isLoading || !data)
        return <Spinner />

    return (
        <>
            <Head>
                <title>Add State</title>
                <meta name="description" content="View Single user in e-commerces application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <PageName title="Add State" />

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Add State</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className='row'>

                                        <div className='col-md-3'>
                                            <CustomSelect
                                                isMulti={false}
                                                onChange={onChangeInput}
                                                options={options}
                                                name="country"
                                                label="Choose a libary"
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.region}
                                                placeholder="Region"
                                                label="Region"
                                                name="region"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.region && formik.touched.region ? formik.errors.region : null}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="number"
                                                placeholder="GST Code"
                                                label="GST Code"
                                                name="gstCode"
                                                value={formik.values.gstCode}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.gstCode && formik.touched.gstCode ? formik.errors.gstCode : null}
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
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>State List</h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Region</th>
                                            <th>GST Code</th>
                                            <th>Country Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state?.map((d, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{d.id}</td>
                                                    <td>{d.region}</td>
                                                    <td>{d.gstCode}</td>
                                                    <td>{d.regionCode}</td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>

        </>
    )
}

addState.Layout = MainLayout;
export default addState