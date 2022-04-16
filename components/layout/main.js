import { useSelector } from "react-redux";
import TopNav from "../header/TopNav";
import Sidebar from '../sidebar/SIdebarItem'
import Unauthorized from "../error/Unauthorized";
import DefaultLayout from "../layout/default";

export default function MainLayout({ children }) {
    const isActive = useSelector((state) => state.switchMenu.sideMenu);
    // const { user } = useSelector((state) => state.auth);
    // console.log(user);
    const user = true;
    return (
        <>
            {user != null ?
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
