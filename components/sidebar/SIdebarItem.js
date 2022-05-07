import React from 'react'
import { useSelector } from 'react-redux'
import Navigation from './Navigation'
import { adminMenu, sellerMenu } from '../../script/menuList'
import { getUserName } from '../../config/getLocalData'
const SIdebarItem = () => {
    const userName = getUserName();

    const getMenuList = () => {
        if (userName === 'admin') {
            return adminMenu;
        }
        else if (userName === 'system') {
            return sellerMenu;
        }
        else {
            return []
        }
    }

    const menuList = getMenuList();

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