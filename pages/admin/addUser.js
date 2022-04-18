import React, { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import InputField from '../../components/form-element/InputField'
import Head from 'next/head'
import TableRows from '../../components/table/TableRows'
import { AiOutlinePlus } from "react-icons/ai";

const addUser = () => {
    const [rowsData, setRowsData] = useState([]);
    const [inputValue, setInputValue] = useState({
        userid: "",
        fname: "",
        lname: "",
        mobile: "",
        email: "",
        designation: "",
    });
    const { userid, fname, lname, mobile, email, designation } = inputValue;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

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

    //TODO SUbmit User Dta
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValue);
    };

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
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={userid}
                                                placeholder="User Id"
                                                label="User Id"
                                                name="userid"
                                                onChange={handleChange}
                                            />
                                        </div>


                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={fname}
                                                placeholder="First Name"
                                                label="First Name"
                                                name="fname"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={lname}
                                                placeholder="Last Name"
                                                label="Last Name"
                                                name="lname"
                                                onChange={handleChange}
                                            />
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
                                                    <th><button className="btn btn-outline-success" onClick={addTableRows} ><AiOutlinePlus /></button></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleRowChange} selectValue={option} />
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='row mt-4 center'>
                                        <button type="submit" className="btn btn-primary">Submit</button>
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