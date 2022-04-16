import React from 'react'
import Head from 'next/head'
import PageLayout from '../../components/layout/PageLayout'
import PageName from '../../components/page_components/PageName'
import MainLayout from '../../components/layout/main'
import Link from 'next/link'

import { FaEdit, FaEye, FaLock } from 'react-icons/fa'

const viewUser = ({ user }) => {
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
                                <h4>View User</h4>
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
                                                user.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{item.name}</td>
                                                            <td>{item.username}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.website}</td>
                                                            <td>
                                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                                    <Link href={`/admin/user/${item.id}`} >
                                                                        <a className="btn btn-sm btn-primary">
                                                                            <FaEdit />
                                                                        </a>
                                                                    </Link>
                                                                    <button type="button" className="btn btn-sm btn-danger"><FaEye /></button>
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


export const getServerSideProps = async () => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/users`
    );
    const user = await res.json();

    return {
        props: {
            user,
        },
    };
};