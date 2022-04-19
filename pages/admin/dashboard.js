import React from 'react'
import PageName from '../../components/page_components/PageName'
import PageLayout from '../../components/layout/PageLayout'
import MainLayout from '../../components/layout/main'
import Head from 'next/head'
import Link from 'next/link';
import useSWR from "swr";
import axios from 'axios'
const dashboard = () => {

    const address = `https://randomuser.me/api/?results=6`;
    const fetcher = async (url) => await axios.get(url).then((res) => res.data);
    const { data, error } = useSWR(address, fetcher);
    if (error) <p>Loading failed...</p>;
    if (!data) console.log('Loading...');
    console.log(data)
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