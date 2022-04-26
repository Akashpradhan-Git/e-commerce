import PageLayout from '../../components/layout/PageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import InputField from '../../components/form-element/InputField'
import { API_HOST } from '../../api/api'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios'
import Spinner from '../../components/util/Spinner'
import TableRows from '../../components/table/TableRows'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify'

const singleUser = () => {
    const router = useRouter()
    const uniqueId = router.query.id;
    const [rowsData, setRowsData] = useState([]); // table rows data
    const [dateOfbirth, setdateOfbirth] = useState("");

    const [isLoading, setIsLoading] = useState(true)
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getUniqueUser = async () => {
        try {

            const { data } = await axios.get(`${API_HOST}/1.0/umt/users/edit/${uniqueId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`
                }
            })
            console.log(data)
            setInputValue({
                userName: data.data.userName,
                firstName: data.data.firstName,
                lastName: data.data.lastName,
                mobile: data.data.mobile,
                email: data.data.email,
                designation: data.data.designation,
                role: data.data.role
            })
            setdateOfbirth(data.data.dateOfBirth)
            setRowsData(data.data.role)
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    useEffect(() => {
        getUniqueUser()
    }, [])

    //TODO : Update User with its ID
    const updateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const updateData = submitData()

        const dataSubmit = {
            isPrimary: updateData.isPrimary,
            roleId: updateData.roleId,
            username: updateData.userName,
            firstname: updateData.firstName,
            lastname: updateData.lastName,
            userMobile: updateData.mobile,
            userEmail: updateData.email,
            dateOfbirth: moment(dateOfbirth).format('DD/MM/YYYY').toString(),
            designation: updateData.designation
        }
        try {
            const { data } = await axios.post(`${API_HOST}/1.0/umt/users/save`, dataSubmit, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`
                }
            })

            if (!data.outcome) return false

            setIsLoading(false)
            toast.success('User Updated Succesfully');
            router.push('/admin/viewUser');
        }
        catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    //TODO : Submit Data Function
    function submitData() {
        // const dateOfbirth = moment(dateOfbirth).format('DD/MM/YYYY').toString();
        let isPrimary = [];
        let roleId = [];
        const { role, ...updateData } = { ...inputValue }
        rowsData.forEach(element => {
            isPrimary.push(
                element.isPrimary,
            )
            roleId.push(
                element.roleId,
            )
        });
        const formData = { ...updateData, isPrimary, roleId }
        return formData
    }


    //TODO Dynamic Table Rows
    const addTableRows = () => {
        const rowsInput = {
            isPrimary: null,
            roleId: null,
            status: null
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
                                                value={userName}
                                                placeholder="User Name"
                                                label="User Name"
                                                name="userName"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={firstName}
                                                placeholder="First Name"
                                                label="First Name"
                                                name="firstName"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={lastName}
                                                placeholder="Last Name"
                                                label="Last Name"
                                                name="lastName"
                                                onChange={handleChange}
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
                                                value={mobile}
                                                placeholder="Mobile"
                                                label="Mobile"
                                                name="mobile"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="email"
                                                value={email}
                                                placeholder="Email"
                                                label="Email"
                                                name="email"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={designation}
                                                placeholder="Designation"
                                                label="Designation"
                                                name="designation"
                                                onChange={handleChange}
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
                                                <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleRowChange} selectValue={role} isEdit={true} />
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='row center'>
                                        <button type="submit" className="btn btn-sm btn-primary" onClick={updateUser}>Update</button>
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




