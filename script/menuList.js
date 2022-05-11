export const adminMenu = [{
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
            name: "Add Product Category",
            url: "/admin/product/add-product-category",
            isParents: false,
        },
        {
            name: "Add Product Attributes",
            url: "/admin/product/add-product-attributes",
            isParents: false,
        },
        {
            name: "Add Product Brand",
            url: "/admin/product/add-product-brand",
            isParents: false,
        },

    ],
},]

export const sellerMenu = [
    {
        name: 'Dashboard',
        url: '/seller/dashboard-seller',
        icon: 'icon-grid menu-icon',
        isParents: false,
        subMenu: [],
    },
    {
        name: 'Product',
        collapseId: 'user-product',
        icon: 'icon-grid menu-icon',
        isParents: true,
        subMenu: [
            {

                name: "Add Product",
                url: "/seller/products/add-product",
                isParents: false,
            },
            {
                name: "View Product",
                url: "/seller/products/viewUser",
                isParents: false,
            },
        ],
    },
]