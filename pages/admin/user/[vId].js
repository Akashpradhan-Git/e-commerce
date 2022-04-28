import PageLayout from '../../../components/layout/PageLayout'
import PageName from '../../../components/page_components/PageName'
import MainLayout from '../../../components/layout/main'
import InputField from '../../../components/form-element/InputField'
import Head from 'next/head'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useQuery } from 'react-query'
import * as api from '../../../api/usersApi'
import Spinner from '../../../components/util/Spinner'

const singleUser = () => {
    const router = useRouter()
    const uniqueId = router.query.vId;

    const { isLoading, isError, data } = useQuery(['/umt/users/', uniqueId], () => api.getUserById(uniqueId))

    if (isLoading) return <Spinner />

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
                                                value={data?.data.userId ? data?.data.userId : ''}
                                                placeholder="User Id"
                                                label="User Id"
                                                name="userid"
                                                readonly
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={data?.data.userName ? data?.data.userName : ''}
                                                placeholder="User Name"
                                                label="User Name"
                                                name="username"
                                                readonly
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={data?.data.firstName ? data?.data.firstName : ''}
                                                placeholder="First Name"
                                                label="First Name"
                                                name="fname"
                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={data?.data.lastName ? data?.data.lastName : ''}
                                                placeholder="Last Name"
                                                label="Last Name"
                                                name="lname"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={data?.data.lastName ? moment(data?.data.lastName).format('DD/MM/YYYY') : ''}
                                                placeholder="Date of Birth"
                                                label="Date of Birth"
                                                name="dob"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="number"
                                                value={data?.data.mobile ? data?.data.mobile : ''}
                                                placeholder="Mobile"
                                                label="Mobile"
                                                name="mobile"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="email"
                                                value={data?.data.email ? data?.data.email : ''}
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
