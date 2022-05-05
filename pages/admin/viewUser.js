import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { FaEdit, FaEye } from 'react-icons/fa'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'
import PageLayout from '../../components/layout/PageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import Spinner from '../../components/util/Spinner'
import Pagination from '../../components/pagination/Pagination'
import getToken from '../../config/getToken'
import * as api from '../../services/usersApi'
import useSWR from 'swr'


const viewUser = () => {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    //* Get token from localStorage and if not present then redirect to login page
    const token = getToken()
    useEffect(() => {
        if (!token) {
            toast.error("You are not logged in")
            router.push('/')
        }
    }, [token])

    //* Get user list
    const { data, error, isLoading, isError } = useSWR('/api/user/view', api.getUsersList);


    if (isError) {
        toast.warn("failed to load")
    }

    if (!data) return <Spinner />

    // ! Pegination

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


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

                                                                    <Link href='/admin/user/[userId]' as={`/admin/user/${item.userId}`}>
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

                                    <Pagination
                                        postsPerPage={postsPerPage}
                                        totalPosts={data?.length}
                                        paginate={paginate}
                                    />
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





