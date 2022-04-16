import React from 'react'
import PageName from '../../components/page_components/PageName'
import PageLayout from '../../components/layout/PageLayout'
import MainLayout from '../../components/layout/main'
import Head from 'next/head'

const dashboard = () => {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <PageLayout>
                <PageName title="Dashboard" />
                <h1>Dashboard</h1>
            </PageLayout>
        </>
    )
}
dashboard.Layout = MainLayout;

export default dashboard