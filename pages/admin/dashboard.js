import React from 'react'
import PageName from '../../components/page_components/PageName'
import PageLayout from '../../components/layout/PageLayout'
import MainLayout from '../../components/layout/main'
import Head from 'next/head'
import Link from 'next/link';


const dashboard = () => {

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <PageLayout>
                <PageName title="Dashboard" />
                <h1>Dashboard</h1>



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