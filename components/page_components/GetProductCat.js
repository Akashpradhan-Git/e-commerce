
import useSWR from 'swr'
import * as api from '../../services/productApi'
import DataTable from 'react-data-table-component';
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa';
import { Spinner } from '../index'
function GetProductCat() {

    const { data, error, isError, mutate } = useSWR('/api/user/role', api.getProductCategory);

    if (isError) return <div>failed to load</div>
    if (!data) return <Spinner />


    const tableRow = data?.map((item, index) => {
        return {
            id: index + 1,
            categoryCode: item.categoryCode,
            categoryName: item.categoryName,
            categoryDescription: item.categoryDescription,
            isHeader: item?.isHeader.toString(),
            categoryImage: item?.categoryImage.toString(),
        }
    })

    const columns = [
        {
            name: 'Sl#',
            selector: row => row.id,
            sortable: true,
            width: '100px',
        },
        {
            name: 'category Code',
            selector: row => row.categoryCode,
            sortable: true,
        },
        {
            name: 'category Name',
            selector: row => row.categoryName,
        },
        {
            name: 'category Description',
            selector: row => row.categoryDescription,
        },
        {
            name: 'is Header',
            selector: row => row.isHeader,
        },
        {
            name: 'Image',
            grow: 0,
            cell: row => { console.log("Roww", row.categoryImage) },
        },
        {
            name: 'Action',
            grow: 0,
            cell: row => <Link href={`/admin/product/edit-product-cat/${row.categoryCode}`}><a title='Edit'><FaEdit /></a></Link>,
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
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: '#ccc',

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
                borderLeftStyle: 'solid',
                borderLeftStyle: '1px',
                borderLeftStyle: '#ccc',
            }
        }

    };

    return (
        <>
            <div className="col-md-12 mt-4">
                <div className="card">
                    <div className='card-title'>
                        <h4>Product Category List</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <DataTable
                                        columns={columns}
                                        data={tableRow}
                                        pagination
                                        customStyles={customStyles}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default GetProductCat