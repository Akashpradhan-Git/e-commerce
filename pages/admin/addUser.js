import React, { useState } from 'react'
import PageLayout from '../../components/layout/pageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import InputField from '../../components/form-element/InputField'
import Head from 'next/head'
import TableRows from '../../components/table/TableRows'
import { AiOutlinePlus } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as api from '../../services/usersApi'
import Spinner from '../../components/util/Spinner'
import useSWR from 'swr'

//! FIXME Use React mutation hook
const addUser = () => {
    const [dob, setDob] = useState("");
    const [rowsData, setRowsData] = useState([]); // table rows data
    const [isLoading, setIsLoading] = useState(false); // loading state
    //! User Validation
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const formik = useFormik({
        initialValues: {
            username: "",
            firstname: "",
            lastname: "",
            userMobile: "",
            userEmail: "",
            designation: "",
            roleId: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            firstname: Yup.string().required('Firstname is required'),
            lastname: Yup.string().required('Lastname is required'),
            userMobile: Yup.string().max(10).min(10).matches(phoneRegExp, 'Phone number is not valid').required('Mobile is required'),
            userEmail: Yup.string().email("Field should contain a valid e-mail").required('Email is required'),
            designation: Yup.string().required('Designation is required'),
            roleId: Yup.string().required('Role is required')
        }),
        onSubmit: async values => {
            const formData = submitData(values)
            setIsLoading(true)
            const response = await api.saveUser(formData)

            if (response.outcome === true) {
                toast.success("User Added Successfully")
                setIsLoading(false)
            }
            else {
                toast.error("User Not Added")
                setIsLoading(false)
            }
        },
    });

    function submitData(values) {
        const dateOfbirth = moment(dob).format('DD/MM/YYYY').toString();
        const isPrimary = 1
        const formData = { ...values, dateOfbirth, isPrimary }
        return formData
    }


    //TODO : Get Role Data from API and Pass to Dynamic Select Field


    const { data } = useSWR('/api/user/role', api.getRoleList);
    if (isLoading) return <Spinner />

    return (
        <>
            <Head>
                <title>Add User</title>
            </Head>
            <PageLayout>
                <PageName title="Add User" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Add User</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.username}
                                                placeholder="User Name"
                                                label="User Name"
                                                name="username"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.username && formik.touched.username ? formik.errors.username : null}
                                            />

                                        </div>
                                        <div className='col-md-3'>
                                            <div className="form-group">
                                                <label htmlFor="input-field">Date of Birth</label>
                                                <DatePicker
                                                    selected={dob}
                                                    onChange={(date) => setDob(date)}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    maxDate={new Date()}
                                                    className="form-control form-control-sm"
                                                    placeholderText="dd/MM/yyyy"
                                                    dateFormat="dd/MM/yyyy"
                                                />

                                                <style global jsx>{`
                                                        .react-datepicker__month-select,
                                                        .react-datepicker__year-select{
                                                            height: 22px;
                                                            border-radius: 10px;
                                                        }
                                                        .react-datepicker__header__dropdown{
                                                                display: flex;
                                                                justify-content: space-around;
                                                                margin-top: 3px;
                                                        }
                                                        .react-datepicker__header{
                                                            background: #a278e7b0;
                                                        }
                                                        input[type=number]::-webkit-inner-spin-button, 
                                                        input[type=number]::-webkit-outer-spin-button { 
                                                        -webkit-appearance: none; 
                                                        margin: 0; 
                                                        }
                                                       
                                                    `}</style>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.firstname}
                                                placeholder="First Name"
                                                label="First Name"
                                                name="firstname"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.firstname && formik.touched.firstname ? formik.errors.firstname : null}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.lastname}
                                                placeholder="Last Name"
                                                label="Last Name"
                                                name="lastname"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.lastname && formik.touched.lastname ? formik.errors.lastname : null}
                                            />

                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="number"
                                                value={formik.values.userMobile}
                                                placeholder="Mobile"
                                                label="Mobile"
                                                name="userMobile"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.userMobile && formik.touched.userMobile ? formik.errors.userMobile : null}

                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="email"
                                                value={formik.values.userEmail}
                                                placeholder="Email"
                                                label="Email"
                                                name="userEmail"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.userEmail && formik.touched.userEmail ? formik.errors.userEmail : null}

                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.designation}
                                                placeholder="Designation"
                                                label="Designation"
                                                name="designation"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.designation && formik.touched.designation ? formik.errors.designation : null}

                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <div className="form-group">
                                                <label htmlFor="input-field">Role</label>
                                                <select className="form-control form-control-sm" name="roleId" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                                    <option value="">Select Role</option>
                                                    {
                                                        data?.map(item => {
                                                            return (
                                                                <option key={item.roleId} value={item.roleId}>{item.displayName}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {formik.errors.roleId && formik.touched.roleId ? <small className="text-danger">{formik.errors.roleId}</small> : null}
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

addUser.Layout = MainLayout;

export default addUser