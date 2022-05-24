import { PageLayout, PageName, MainLayout, InputField } from '../../../components/index'
import Head from 'next/head'
import { useRouter } from 'next/router'
import moment from 'moment'
import * as api from '../../../services/masterApi'
import useSWR from 'swr'

function category() {
    return (
        <>
            <Head>
                <title>View Single User</title>
                <meta name="description" content="View Single user in e-commerces application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <PageName title="Add Category" />

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>View User</h4>
                            </div>
                            <div className="card-body">
                                <form >
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={""}
                                                placeholder="Category Name"
                                                label="Category Name"
                                                name="categoryName"
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={""}
                                                placeholder="Category Code"
                                                label="Category Code"
                                                name="categoryCode"
                                            />
                                        </div>
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

category.Layout = MainLayout;
export default category