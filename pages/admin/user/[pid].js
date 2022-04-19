import PageLayout from '../../../components/layout/PageLayout'
import PageName from '../../../components/page_components/PageName'
import MainLayout from '../../../components/layout/main'
import InputField from '../../../components/form-element/InputField'
import { API_HOST } from '../../../api/api'
import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const singleUser = () => {
    const router = useRouter()
    const uniqueId = router.query.pid;
    const [inputValue, setInputValue] = useState({
        userid: "",
        fname: "",
        lname: "",
        mobile: "",
        email: "",
        designation: "",
    });
    const { userid, fname, lname, mobile, email, designation } = inputValue;

    const getUniqueUser = async () => {
        try {
            const { data } = await axios.get(`${API_HOST}/1.0/umt/users/${uniqueId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`
                }
            })
            setInputValue({
                userid: data.data.userId,
                fname: data.data.firstName,
                lname: data.data.lastName,
                mobile: data.data.mobile,
                email: data.data.email,
                designation: data.data.designation,
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getUniqueUser()
    }, [])

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
                                                value={userid}
                                                placeholder="User Id"
                                                label="User Id"
                                                name="userid"

                                                readonly
                                            />
                                        </div>

                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={fname}
                                                placeholder="First Name"
                                                label="First Name"
                                                name="fname"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={lname}
                                                placeholder="Last Name"
                                                label="Last Name"
                                                name="lname"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="number"
                                                value={mobile}
                                                placeholder="Mobile"
                                                label="Mobile"
                                                name="mobile"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="email"
                                                value={email}
                                                placeholder="Email"
                                                label="Email"
                                                name="email"

                                                readonly
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={designation}
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
