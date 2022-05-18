import { useSelector } from "react-redux";
import TopNav from "../header/TopNav";
import Sidebar from '../sidebar/SIdebarItem'
import DefaultLayout from "../layout/default";
import { getToken } from "../../config/getLocalData";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function MainLayout({ children }) {
    const isActive = useSelector((state) => state.switchMenu.sideMenu);
    const user = getToken()
    const router = useRouter()
    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    }, [user])
    return (
        <>
            <main className={isActive}>
                <div className="container-scroller">
                    <TopNav />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar />
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}
