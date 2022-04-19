import React, { useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { FaEdit, FaEye, FaLock } from 'react-icons/fa'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import PageLayout from '../../components/layout/PageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import { API_HOST } from '../../api/api'
import Spinner from '../../components/util/Spinner'

const viewUser = () => {
    const router = useRouter()
    // const [isLoading, setIsLoading] = useState(true)
    // const [userList, setUserList] = useState([])

    const token = null
    if (typeof window !== 'undefined') {
        token = JSON.parse(localStorage.getItem('user'));
    }

    useEffect(() => {
        if (!token) {
            toast.error("You are not logged in")
            router.push('/')
        }
    }, [token])

    const fetcher = async () => {
        try {
            const { data } = await axios.get(`${API_HOST}/1.0/umt/users/lists`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            return data.data.content
        } catch (error) {
            console.log(error)
        }
    }

    const { data, error } = useSWR('viewUserData', fetcher);

    if (error) {
        toast.warn("failed to load")
    }
    if (!data) return <Spinner />


    //! Please do not delete this comment

    // useEffect(() => {
    //     if (token !== null) {
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         }
    //         axios.get(`${API_HOST}/1.0/umt/users/lists`, config)
    //             .then(res => {
    //                 setUserList(res.data.data.content)
    //                 setIsLoading(false);
    //             })
    //             .catch(err => {
    //                 setIsLoading(false);
    //                 console.log(err)
    //             })
    //     }
    //     else {
    //         router.push('/login')
    //     }
    //     dispatch(reset())
    // }, [token, dispatch])


    return (
        <>
            <Head>
                <title>View User</title>
            </Head>
            <PageLayout>
                <PageName title="View User" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>View All User</h4>
                            </div>
                            <div className="card-body">
                                <div className='col-md-12 table-responsive'>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">User Name</th>
                                                <th scope="col">User Id</th>
                                                <th scope="col">MObile Number</th>
                                                <th>Email Id</th>
                                                <th>Created On</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data?.map((item, index) => {
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
                                                                        <a className="btn btn-sm btn-primary">
                                                                            <FaEdit />
                                                                        </a>
                                                                    </Link>

                                                                    <Link href='/admin/user/[pid]' as={`/admin/user/${item.userId}`}>
                                                                        <a className="btn btn-sm btn-danger">
                                                                            <FaEye />
                                                                        </a>
                                                                    </Link>
                                                                    <button type="button" className="btn btn-sm btn-success"><FaLock /></button>
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
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}
viewUser.Layout = MainLayout;

export default viewUser


