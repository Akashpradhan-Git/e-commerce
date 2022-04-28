import React from 'react'
import Head from 'next/head'
import PageLayout from '../../components/layout/PageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputField from '../../components/form-element/InputField'
import { FaEdit, FaEye } from 'react-icons/fa'
import Link from 'next/link'

const roleList = () => {

    const formik = useFormik({
        initialValues: {
            rolecode: "",
            displayname: "",
            description: "",
            maxAssign: "",

        },
        validationSchema: Yup.object({
            rolecode: Yup.string().required('Username is required'),
            displayname: Yup.string().required('Firstname is required'),
            description: Yup.string().required('Lastname is required'),
            maxAssign: Yup.string().required('Designation is required'),

        }),
        onSubmit: async values => {
            // const formData = submitData(values)
            // const token = getToken()
            // try {
            //     let { data } = await axios.post('/1.0/umt/users/save', formData,
            //         {
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 'Authorization': `Bearer ${token}`
            //             }
            //         });

            //     if (data.outcome === true) {
            //         toast.success("User Added Successfully")
            //     }
            //     else {
            //         toast.error("User Not Added")
            //         console.log(data)
            //     }
            // } catch (error) {
            //     console.log(error)
            // }
        },
    });





    return (
        <>
            <Head>
                <title>Role List</title>
            </Head>
            <PageLayout>
                <PageName title="Manage Role" />

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Add Role</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.rolecode}
                                                placeholder="Role Code"
                                                label="Role Code"
                                                name="rolecode"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.rolecode && formik.touched.rolecode ? formik.errors.rolecode : null}
                                            />

                                        </div>

                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.displayname}
                                                placeholder="Display Name"
                                                label="Display Name"
                                                name="displayname"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.displayname && formik.touched.displayname ? formik.errors.displayname : null}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.description}
                                                placeholder="Description"
                                                label="Description"
                                                name="description"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.description && formik.touched.description ? formik.errors.description : null}
                                            />

                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="number"
                                                value={formik.values.maxAssign}
                                                placeholder="Maximum Assignment"
                                                label="Maximum Assignment"
                                                name="maxAssign"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.maxAssign && formik.touched.maxAssign ? formik.errors.maxAssign : null}

                                            />
                                        </div>

                                    </div>
                                    <div className='row my-3 center'>
                                        <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Submit</button>
                                    </div>

                                    <div className="row">
                                        <div className='col-md-12 table-responsive'>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Role Code</th>
                                                        <th scope="col">Display Name</th>
                                                        <th scope="col">Description</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1 </td>
                                                        <td>Role_admin </td>
                                                        <td>Admin User</td>
                                                        <td>System Admin </td>
                                                        <td>
                                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                                <Link href='/admin/user/edit-role/[eId]' as={`/admin/user/edit-role/1`}>
                                                                    <a className="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" title="Edit">
                                                                        <FaEdit />
                                                                    </a>
                                                                </Link>

                                                                <Link href='/admin/user/view-role/[vid]' as={`/admin/user/view-role/2`}>
                                                                    <a className="btn btn-sm btn-danger" data-toggle="tooltip" data-placement="top" title="View">
                                                                        <FaEye />
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {/* {
                                                        currentPosts?.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{item.userName}</td>
                                                                    <td>{item.userId}</td>
                                                                    <td>{item.mobile}</td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.designation}</td>
                                                                    <td>
                                                                        <div className="btn-group" role="group" aria-label="Basic example">
                                                                            <Link href='/admin/[id]' as={`/admin/${item.userId}`}>
                                                                                <a className="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" title="Edit">
                                                                                    <FaEdit />
                                                                                </a>
                                                                            </Link>

                                                                            <Link href='/admin/user/[vId]' as={`/admin/user/${item.userId}`}>
                                                                                <a className="btn btn-sm btn-danger" data-toggle="tooltip" data-placement="top" title="View">
                                                                                    <FaEye />
                                                                                </a>
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    } */}

                                                </tbody>
                                            </table>


                                        </div>
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
roleList.Layout = MainLayout;
export default roleList