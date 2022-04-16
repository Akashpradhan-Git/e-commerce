import { useSelector } from "react-redux";
import TopNav from "../header/TopNav";
import Sidebar from '../sidebar/SIdebarItem'
import Unauthorized from "../error/Unauthorized";
import DefaultLayout from "../layout/default";

export default function MainLayout({ children }) {
    const isActive = useSelector((state) => state.switchMenu.sideMenu);
    // const { isLoggedIn } = useSelector((state) => state.auth.isLoggedIn);
    const isLoggedIn = true;

    return (
        <>
            {isLoggedIn ?
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
                </> :
                <DefaultLayout>
                    <Unauthorized />
                </DefaultLayout>

            }
        </>
    )
}
