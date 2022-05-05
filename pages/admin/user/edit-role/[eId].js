import PageLayout from "../../../../components/layout/pageLayout";
import PageName from "../../../../components/page_components/PageName";
import InputField from "../../../../components/form-element/InputField";
import MainLayout from "../../../../components/layout/main";
import { useRouter } from 'next/router'
import Head from "next/head";
import * as api from '../../../../services/usersApi'
import useSWR from 'swr'
import { useFormik } from 'formik'
import Spinner from "../../../../components/util/Spinner";
import { useEffect, useState } from "react";

function EditRole() {

    const router = useRouter()
    const { eId } = router.query;

    const [isLoading, setIsLoading] = useState(false)

    const [role, setRole] = useState({
        roleId: "",
        roleCode: "",
        description: "",
        displayName: "",
        maxAssignments: ""
    })
    const { roleId, roleCode, description, displayName, maxAssignments } = role;

    const { data } = useSWR(['/api/umt/roles:id', 'edit Role', eId], () => api.getRoleById(eId));

    // * : Get Unique User
    // useEffect(() => {
    //      getRoleById()
    // }, [])


    // const getRoleById = async () => {
    //     try {
    //         setIsLoading(true)
    //         const data = await api.getRoleById(eId);
    //         setRole({
    //             roleId: data?.data.roleId,
    //             roleCode: data?.data.roleCode,
    //             description: data?.data.description,
    //             displayName: data?.data.displayName,
    //             maxAssignments: data?.data.maxAssignments,
    //         })
    //         setIsLoading(false)
    //     }
    //     catch (err) {
    //         setIsLoading(false)
    //         console.log(err)
    //     }
    // }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            roleId: data?.data.roleId || "",
            roleCode: data?.data.roleCode || "",
            description: data?.data.description || "",
            displayName: data?.data.displayName || "",
            maxAssignments: data?.data.maxAssignments || "",
        },
        onSubmit: values => {
            try {
                const res = api.updateRole(values)
                console.log(res)
            } catch (error) {

            }
        }
    });


    if (!data) return <Spinner />
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
                                        />

                                    </div>

                                    <div className='col-md-3'>
                                        <InputField
                                            type="text"
                                            placeholder="Display Name"
                                            label="Display Name"
                                            name="displayName"
                                            value={formik.values.displayName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    <div className='col-md-3'>
                                        <InputField
                                            type="text"
                                            placeholder="Description"
                                            label="Description"
                                            name="description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    <div className='col-md-3'>
                                        <InputField
                                            type="number"
                                            placeholder="Maximum Assignment"
                                            label="Maximum Assignment"
                                            name="maxAssignments"
                                            value={formik.values.maxAssignments}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>

                                </div>
                                <div className='row center'>
                                    <button type="button" className="btn btn-sm btn-dark ml-1" onClick={() => router.back()}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>

        </>
    )
}
EditRole.Layout = MainLayout;
export default EditRole






