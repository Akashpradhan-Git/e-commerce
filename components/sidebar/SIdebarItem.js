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
    },
    {
        name: 'Master',
        collapseId: 'master',
        icon: 'icon-grid menu-icon',
        isParents: true,
        subMenu: [
            {

                name: "Add Country",
                url: "/admin/master/addCountry",
                isParents: false,
            },
            {

                name: "Add State",
                url: "/admin/master/add-State",
                isParents: false,
            },
            {

                name: "Add City",
                url: "/admin/master/addCity",
                isParents: false,
            },
            {
                name: "Customer  Address",
                url: "/admin/master/customerAddress",
                isParents: false,
            },
            {
                name: "Bushiness  Type",
                url: "/admin/master/businessType",
                isParents: false,
            },
        ],
    },
    {
        name: 'Product',
        collapseId: 'product',
        icon: 'icon-grid menu-icon',
        isParents: true,
        subMenu: [
            {
                name: "Product Add",
                url: "/admin/product/addProduct",
                isParents: false,
            },
            {
                name: "Add Product Category",
                url: "/admin/product/add-product-category",
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