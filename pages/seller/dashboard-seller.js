import React from 'react'
import Head from 'next/head'
import { PageLayout, PageName, MainLayout } from '../../components/index'

const dashboardSeller = () => {

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
dashboardSeller.Layout = MainLayout;

export default dashboardSeller