import PageLayout from '../../components/layout/PageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import InputField from '../../components/form-element/InputField'
import { API_HOST } from '../../api/api'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlinePlus } from "react-icons/ai";
import axios from '../../config/axiosInstance'
import Spinner from '../../components/util/Spinner'
import TableRows from '../../components/table/TableRows'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as api from '../../api/usersApi'
import { useEffect } from 'react'
import getToken from '../../config/getToken'
import useFetch from '../../api/useFetch'


const singleUser = () => {

    const router = useRouter()
    const uniqueId = router.query.id;
    const [rowsData, setRowsData] = useState([]); // table rows data
    const [dateOfbirth, setdateOfbirth] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        designation: "",
        role: []
    });
    const { userName, firstName, lastName, mobile, email, designation, role } = inputValue;

    // * : Get Unique User
    useEffect(() => {
        getUserById()
    }, [])

    const getUserById = async () => {
        try {
            setIsLoading(true)
            const data = await api.getUserById(uniqueId)
            setInputValue({
                userName: data.data.userName,
                firstName: data.data.firstName,
                lastName: data.data.lastName,
                mobile: data.data.mobile,
                email: data.data.email,
                designation: data.data.designation,
                role: data.data.primaryRole
            })
            setdateOfbirth(data.data.dateOfBirth)
            setRowsData(data?.data.userRoleMap)
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }


    //! User Validation
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: userName ? userName : '',
            firstname: firstName ? firstName : '',
            lastname: lastName ? lastName : '',
            userMobile: mobile ? mobile : '',
            userEmail: email ? email : '',
            designation: designation ? designation : '',
            dob: dateOfbirth ? dateOfbirth : '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            firstname: Yup.string().required('Firstname is required'),
            lastname: Yup.string().required('Lastname is required'),
            userMobile: Yup.string().max(10).min(10).matches(phoneRegExp, 'Phone number is not valid').required('Mobile is required'),
            userEmail: Yup.string().email("Field should contain a valid e-mail").required('Email is required'),
            designation: Yup.string().required('Designation is required'),

        }),

        onSubmit: async values => {
            const formData = submitData(values)
            console.log(formData)
            try {
                setIsLoading(true)
                const data = await api.updateUser(uniqueId, formData)
                console.log(data)

                if (data.outcome) {
                    setIsLoading(false)
                    toast.success("User Updated Successfully")
                    router.push('/admin/viewUser')
                }
                else {
                    setIsLoading(false)
                    toast.error(data.message)
                }
            }
            catch (err) {
                console.log(err)
            }
        },
    });

    // ! Update User
    function submitData(values) {
        const { dob, ...rest } = { ...values }
        const dateOfbirth = dateOfbirth ? moment(dateOfbirth).format('DD/MM/YYYY').toString() : moment(dob).format('DD/MM/YYYY').toString()

        let isPrimary = [];
        let roleId = [];

        rowsData.forEach(element => {
            console.log(element)
            isPrimary.push(
                parseInt(element.isPrimary),
            )
            roleId.push(
                parseInt(element.roleId),
            )
        });
        const formData = { ...rest, dateOfbirth, isPrimary, roleId }
        return formData
    }

    //TODO Dynamic Table Rows
    const addTableRows = () => {
        const rowsInput = {
            isPrimary: "",
            roleId: "",
            status: "",
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

    //TODO : Get Role Data from API and Pass to Dynamic Select Field
    const token = getToken();
    const [data] = useFetch('/1.0/umt/roles/', token);

    if (isLoading)
        return <Spinner />

    return (
        <>
            <Head>
                <title>Edit User</title>
                <meta name="description" content="Edit Single user in e-commerces application" />
                <link rel="icon" href="/favicon.ico" />
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
                                            <div className="form-group">
                                                <label htmlFor="input-field">Date of Birth</label>
                                                <DatePicker
                                                    selected={dateOfbirth ? dateOfbirth : formik.values.dob}
                                                    onChange={(date) => setdateOfbirth(date)}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    maxDate={new Date()}
                                                    dropdownMode="select"
                                                    className="form-control form-control-sm"
                                                    placeholderText="dd/MM/yyyy"
                                                    dateFormat="dd/MM/yyyy"
                                                    name='dateOfbirth'
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
                                                    <th><button className={`btn btn-outline-success ${role == null ? "disabled" : ""}`} type='button' onClick={addTableRows}  ><AiOutlinePlus /></button></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleRowChange} selectValue={data} isEdit={true} />
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='row center'>
                                        <button type="submit" className="btn btn-sm btn-primary" onClick={formik.handleSubmit}>Update</button>
                                        <button type="button" className="btn btn-sm btn-dark ml-1" onClick={() => router.back()}>Back</button>
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
singleUser.Layout = MainLayout;
export default singleUser




