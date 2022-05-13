import React from 'react'
import PageName from '../../components/page_components/PageName'
import PageLayout from '../../components/layout/pageLayout'
import MainLayout from '../../components/layout/main'
import Head from 'next/head'
import Link from 'next/link';

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