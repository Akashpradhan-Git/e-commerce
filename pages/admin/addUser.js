import React, { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import InputField from '../../components/form-element/InputField'
import Head from 'next/head'
import TableRows from '../../components/table/TableRows'
import { AiOutlinePlus } from "react-icons/ai";
import DatePicker from "react-datepicker";
import axios from '../../config/axiosInstance'
import "react-datepicker/dist/react-datepicker.css";
import { API_HOST } from '../../api/api'
import moment from 'moment'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'


const addUser = () => {
    const [dateOfbirth, setdateOfbirth] = useState("");
    const [rowsData, setRowsData] = useState([]);

    //! User Validation
    const formik = useFormik({
        initialValues: {
            username: "",
            firstname: "",
            lastname: "",
            userMobile: "",
            userEmail: "",
            designation: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            firstname: Yup.string().required('Firstname is required'),
            lastname: Yup.string().required('Lastname is required'),
            userMobile: Yup.string().required('Mobile is required'),
            userEmail: Yup.string().email("Field should contain a valid e-mail").required('Email is required'),
            designation: Yup.string().required('Designation is required'),

        }),
        onSubmit: async values => {
            const formData = submitData(values)
            const token = getToken()
            try {
                let { data } = await axios.post('/1.0/umt/users/save', formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                if (data.outcome === true) {
                    toast.success("User Added Successfully")
                }
                else {
                    toast.error("User Not Added")
                    console.log(data)
                }
            } catch (error) {
                console.log(error)
            }
        },
    });

    function submitData(values) {
        const dateOfbirth = moment(dateOfbirth).format('DD/MM/YYYY').toString();
        const tArray = {
            "isPrimary": [1],
            "roleId": [1]
        }
        const formData = { ...values, dateOfbirth, ...tArray }
        return formData
    }


    //Todo : Get token from local storage
    function getToken() {
        const token = null
        if (typeof window !== 'undefined') {
            token = JSON.parse(localStorage.getItem('user'));
        }
        return token;
    }

    //TODO Dynamic Table Rows
    const addTableRows = () => {

        const rowsInput = {
            pRole: '',
            role: '',
            status: ''
        }
        setRowsData([...rowsData, rowsInput])
    }

    const handleRowChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }



    const option = {
        "primaryRole":
            [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
            ],
        "roles": [
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'User' },

        ],
        "activeStatus": [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
        ]
    }
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
                                                    selected={dateOfbirth}
                                                    onChange={(date) => setdateOfbirth(date)}
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
                                    </div>

                                    <div className="row">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Sl#</th>
                                                    <th>Primary Role</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                    <th><button className="btn btn-outline-success" type='button' onClick={addTableRows} ><AiOutlinePlus /></button></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleRowChange} selectValue={option} />
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='row mt-4 center'>
                                        <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Submit</button>
                                    </div>
                                </form>
                            </div>

                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <form>
                                            <div className='col-md-3'>
                                                <InputField
                                                    type="text"
                                                    value={formik.values.uname}
                                                    placeholder="User Name"
                                                    label="User Name"
                                                    name="uname"
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                            <div className='col-md-3'>
                                                <InputField
                                                    type="text"
                                                    value={formik.values.fname}
                                                    placeholder="User Name"
                                                    label="User Name"
                                                    name="fname"
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Submit</button>
                                        </form>
                                    </div>
                                </div>
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