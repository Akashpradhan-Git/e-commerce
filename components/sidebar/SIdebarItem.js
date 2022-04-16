import React from 'react'
import { useSelector } from 'react-redux'
import Navigation from './Navigation'
const SIdebarItem = () => {

    const sideMenu = [{
        name: 'Dashboard',
        url: '/admin/dashboard',
        icon: 'icon-grid menu-icon',
        isParents: false,
        subMenu: [],
    }
        , {
        name: 'Users',
        icon: 'icon-grid menu-icon',
        isParents: true,
        subMenu: [
            {

                name: "Add User",
                url: "/admin/addUser",
                isParents: false,
            },
            {
                name: "View User",
                url: "/admin/viewUser",
                isParents: false,
            },
        ],
    },]

    const menu = useSelector((state) => state.switchMenu.menu);
    return (
        <>
            <nav className={`${'sidebar sidebar-offcanvas'} ${menu}`} id="sidebar">
                <Navigation menu={sideMenu} />
            </nav>
        </>
    )
}

export default SIdebarItem