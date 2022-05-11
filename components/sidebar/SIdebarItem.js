import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navigation from './Navigation'
import { adminMenu, sellerMenu } from '../../script/menuList'
import { getUserName } from '../../config/getLocalData'

const SIdebarItem = () => {
    const [userName, setUserName] = useState("")
    const uname = useSelector((state) => state.user.userName);

    useEffect(() => {
        setUserName(getUserName())
    }, []);

    const getMenuList = () => {
        if (uname === 'admin' || userName === 'admin') {
            return adminMenu;
        }
        else if (userName === 'system') {
            return sellerMenu;
        }
        else {
            return []
        }
    }

    let menuList = getMenuList();

    const menu = useSelector((state) => state.switchMenu.menu);
    return (
        <>
            <nav className={`${'sidebar sidebar-offcanvas'} ${menu}`} id="sidebar">
                <Navigation menu={menuList} />
            </nav>
        </>
    )
}

export default SIdebarItem