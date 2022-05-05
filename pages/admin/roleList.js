import { useState } from 'react'
import Head from 'next/head'
import PageLayout from '../../components/layout/pageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputField from '../../components/form-element/InputField'
import { FaEdit, FaEye } from 'react-icons/fa'
import Link from 'next/link'
import useSWR from 'swr'
import Spinner from '../../components/util/Spinner'
import { toast } from 'react-toastify'
import * as api from '../../services/usersApi'

const roleList = () => {
    const [isLoading, setIsLoading] = useState(false); // loading state


    //* fetch Role from api
    const { data, error, isError, mutate } = useSWR('/api/user/role', api.getRoleList);

    const formik = useFormik({
        initialValues: {
            roleCode: "",
            displayName: "",
            description: "",
            maxAssignments: "",

        },
        validationSchema: Yup.object({
            roleCode: Yup.string().required('Username is required'),
            displayName: Yup.string().required('Firstname is required'),
            description: Yup.string().required('Lastname is required'),
            maxAssignments: Yup.string().required('Designation is required'),

        }),
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true)
            const response = await api.saveRole(values)
            if (response.outcome === true) {
                setIsLoading(false)
                toast.success("Role saved successfully");
                mutate();
                resetForm();
            } else {
                setIsLoading(false)
                toast.error("Role not saved")
            }
        },
    });


    if (isError) {
        toast.warn("failed to load")
    }

    if (!data) return <Spinner />

    if (isLoading) return <Spinner />


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
                                                value={formik.values.roleCode}
                                                placeholder="Role Code"
                                                label="Role Code"
                                                name="roleCode"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.roleCode && formik.touched.roleCode ? formik.errors.roleCode : null}
                                            />

                                        </div>

                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={formik.values.displayName}
                                                placeholder="Display Name"
                                                label="Display Name"
                                                name="displayName"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.displayName && formik.touched.displayName ? formik.errors.displayName : null}
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
                                                value={formik.values.maxAssignments}
                                                placeholder="Maximum Assignment"
                                                label="Maximum Assignment"
                                                name="maxAssignments"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.errors.maxAssignments && formik.touched.maxAssignments ? formik.errors.maxAssignments : null}

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

                                                    {
                                                        data?.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{item.roleCode}</td>
                                                                    <td>{item.displayName}</td>
                                                                    <td>{item.description}</td>

                                                                    <td>
                                                                        <div className="btn-group" role="group" aria-label="Basic example">
                                                                            <Link href='/admin/user/edit-role/[eId]' as={`/admin/user/edit-role/${item.roleId}`}>
                                                                                <a className="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" title="Edit">
                                                                                    <FaEdit />
                                                                                </a>
                                                                            </Link>

                                                                            <Link href='/admin/user/view-role/[vid]' as={`/admin/user/view-role/${item.roleId}`}>
                                                                                <a className="btn btn-sm btn-danger" data-toggle="tooltip" data-placement="top" title="View">
                                                                                    <FaEye />
                                                                                </a>
                                                                            </Link>
                                                                        </div>
                                                                    </td>

                                                                </tr>
                                                            )
                                                        })
                                                    }

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