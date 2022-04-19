import PageLayout from '../../components/layout/PageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import InputField from '../../components/form-element/InputField'
import { API_HOST } from '../../api/api'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Spinner from '../../components/util/Spinner'


const singleUser = () => {
    const router = useRouter()
    const uniqueId = router.query.id
    const [isLoading, setIsLoading] = useState(true)
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
                                    <div className='row center'>
                                        <button type="submit" className="btn btn-sm btn-primary">Submit</button>
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

