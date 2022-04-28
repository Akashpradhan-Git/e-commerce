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
    },
    {
        name: 'User Management',
        collapseId: 'user-management',
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
    },
    {
        name: 'Addministration',
        collapseId: 'administration',
        icon: 'icon-grid menu-icon',
        isParents: true,
        subMenu: [
            {

                name: "Role List",
                url: "/admin/roleList",
                isParents: false,
            },

        ],
    }]

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