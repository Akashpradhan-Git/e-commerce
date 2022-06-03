import { PageLayout, PageName, MainLayout, InputField, Spinner, CustomSelect } from '../../../../components/index'
import { PublishedList, UnPublishedList } from '../../../../components/page_components/index';
import { useRouter } from 'next/router'
import { useState } from 'react';
import styles from './mngproduct.module.css'

function managePublish() {
    const router = useRouter()
    const { pcode } = router.query;

    const [activeTab, setActiveTab] = useState("tab1");


    let com;
    com = <UnPublishedList productID={pcode} />;

    if (activeTab === "tab1") {
        com = <UnPublishedList productID={pcode} />;
    }
    if (activeTab === "tab2") {
        com = <PublishedList productID={pcode} />;
    }




    return (
        <>
            <PageLayout>
                <PageName title="Published Data" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>Published Data</h4>
                            </div>
                            <div className="card-body">
                                <ul className={styles.uiTab} style={{ padding: 0 }}>
                                    <li
                                        className={activeTab === "tab1" ? styles.active : ""}
                                        onClick={() => {
                                            setActiveTab("tab1");
                                        }}
                                    >
                                        Unpublished
                                    </li>
                                    <li
                                        className={activeTab === "tab2" ? styles.active : ""}
                                        onClick={() => {
                                            setActiveTab("tab2");
                                        }}
                                    >
                                        Published
                                    </li>

                                </ul>
                                <div className="tab-contain">{com}</div>
                            </div>
                        </div>
                    </div>
                </div>


            </PageLayout>
        </>
    )
}
managePublish.Layout = MainLayout;
export default managePublish