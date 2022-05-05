import PageLayout from "../../../../components/layout/PageLayout";
import PageName from "../../../../components/page_components/PageName";
import InputField from "../../../../components/form-element/InputField";
import MainLayout from "../../../../components/layout/main";
import { useRouter } from 'next/router'
import Head from "next/head";
import * as api from '../../../../services/usersApi'
import useSWR from 'swr'
import Spinner from "../../../../components/util/Spinner";


function viewRole() {

    const router = useRouter()
    const { vid } = router.query;
    const { data } = useSWR(['/api/umt/roles', vid], () => api.getRoleById(vid));

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
                                            value={data?.data.roleCode}
                                            placeholder="Role Code"
                                            label="Role Code"
                                            name="roleCode"
                                            readonly
                                        />

                                    </div>

                                    <div className='col-md-3'>
                                        <InputField
                                            type="text"
                                            value={data?.data.displayName}
                                            placeholder="Display Name"
                                            label="Display Name"
                                            name="displayName"
                                            readonly
                                        />
                                    </div>
                                    <div className='col-md-3'>
                                        <InputField
                                            type="text"
                                            value={data?.data.description}
                                            placeholder="Description"
                                            label="Description"
                                            name="description"
                                            readonly
                                        />
                                    </div>
                                    <div className='col-md-3'>
                                        <InputField
                                            type="number"
                                            value={data?.data.maxAssignments}
                                            placeholder="Maximum Assignment"
                                            label="Maximum Assignment"
                                            name="maxAssignments"
                                            readonly

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
viewRole.Layout = MainLayout;
export default viewRole






