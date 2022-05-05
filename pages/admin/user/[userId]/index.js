import PageLayout from '../../../../components/layout/PageLayout'
import PageName from '../../../../components/page_components/PageName'
import MainLayout from '../../../../components/layout/main'
import InputField from '../../../../components/form-element/InputField'
import Head from 'next/head'
import { useRouter } from 'next/router'
import moment from 'moment'
import * as api from '../../../../services/usersApi'
import Spinner from '../../../../components/util/Spinner'
import useSWR from 'swr'

const singleUser = () => {
    const router = useRouter()
    const uniqueId = router.query.userId;

    const { isLoading, isError, data } = useSWR(['/umt/users/', uniqueId], () => api.getUserById(uniqueId))

    if (isError) {
        toast.warn("failed to load")
    }

    if (!data) return <Spinner />
    return (
        <>
            <Head>
                <title>View Single User</title>
                <meta name="description" content="View Single user in e-commerces application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <PageName title="View User" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>View User</h4>
                            </div>
                            <div className="card-body">
                                <form >
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={data?.data.userid ? data?.data.userid : ''}
                                                placeholder="User Id"
                                                label="User Id"
                                                name="userid"
                                                readonly
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={data?.data.username ? data?.data.username : ''}
                                                placeholder="User Name"
                                                label="User Name"
                                                name="username"
                                                readonly
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={data?.data.firstname ? data?.data.firstname : ''}
                                                placeholder="First Name"
                                                label="First Name"
                                                name="fname"
                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={data?.data.lastname ? data?.data.lastname : ''}
                                                placeholder="Last Name"
                                                label="Last Name"
                                                name="lname"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={data?.data.dateOfbirth ? moment(data?.data.dateOfbirth).format('DD/MM/YYYY') : ''}
                                                placeholder="Date of Birth"
                                                label="Date of Birth"
                                                name="dob"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="number"
                                                value={data?.data.userMobile ? data?.data.userMobile : ''}
                                                placeholder="Mobile"
                                                label="Mobile"
                                                name="mobile"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="email"
                                                value={data?.data.userEmail ? data?.data.userEmail : ''}
                                                placeholder="Email"
                                                label="Email"
                                                name="email"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={data?.data.designation ? data?.data.designation : ''}
                                                placeholder="Designation"
                                                label="Designation"
                                                name="designation"
                                                readonly
                                            />
                                        </div>
                                    </div>
                                    <div className='row center'>

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
