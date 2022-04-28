import React from 'react'
import PageName from '../../components/page_components/PageName'
import PageLayout from '../../components/layout/PageLayout'
import MainLayout from '../../components/layout/main'
import Head from 'next/head'
import Link from 'next/link';

import { useQuery } from 'react-query'
import axios from 'axios'

function fetchPosts() {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
}

const dashboard = () => {

    const { isLoading, isError, data, error } = useQuery('userpost', fetchPosts)
    if (isLoading) return <p>Loading...</p>
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <PageLayout>
                <PageName title="Dashboard" />
                <h1>Dashboard</h1>
                {
                    data?.data.map(post => {
                        return <div key={post.id}>{post.body}</div>
                    })
                }


                <Link href='/admin/[id]' as="/admin/1">
                    <a className="btn btn-sm btn-primary">
                        GO
                    </a>
                </Link>
            </PageLayout>
        </>
    )
}
dashboard.Layout = MainLayout;

export default dashboard