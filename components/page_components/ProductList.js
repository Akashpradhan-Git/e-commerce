import DataTable from 'react-data-table-component';
import Link from 'next/link'
import { FiSend } from 'react-icons/fi';
const ProductList = ({ data }) => {
    console.log("data", data)
    const tableRow = data?.map((item, index) => {
        return {
            id: index + 1,
            productCode: item.productCode,
            productName: item.productTitle,
            productDesc: item.productDesc,
            productId: item.productId,
        }
    })

    const handleEdit = (item) => {
        console.log(item)
    }

    const columns = [
        {
            name: 'Sl#',
            selector: row => row.id,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Product Code',
            selector: row => row.productCode,
            sortable: true,
        },
        {
            name: 'Product Name',
            selector: row => row.productName,
        },
        {
            name: 'Product Description',
            selector: row => row.productDesc,
        },
        {
            name: 'Action',
            grow: 0,
            cell: row => <Link href={`/seller/products/manage-publish/${row.productId}`}><a className='btn btn-xs btn-primary' style={{ borderRadius: "5px" }} title='Send for published'><FiSend /></a></Link>,
        },

    ];

    const customStyles = {

        header: {
            style: {
                minHeight: '56px',
            },

        },
        headRow: {
            style: {
                border: "1px solid #ccc"
            },

        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: '#ccc',

                },

            },

        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: '#ccc',
                },
            },
        },

        pagination: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: '#ccc',
                width: '100%',
            },
        },
        table: {
            style: {
                border: '1px solid #ccc',
                // borderRight: '1px solid #ccc',
            }
        }

    };

    return (
        <>
            <DataTable
                columns={columns}
                data={tableRow}
                pagination
                customStyles={customStyles}
            />
        </>
    )
}

export default ProductList