import { useState } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import * as api from '../../services/productApi'
import { useRouter } from 'next/router'
import { getRandomColor } from '../../util/randomColor'

const PublishedList = ({ productID }) => {
    const router = useRouter()
    const [varIds, setVarIds] = useState([])

    const { data, isError, error, mutate } = useSWR(['/api/product/published', productID], () => api.getPublishedProduct(productID))
    const colspan = data && data.length > 0 ? Object.keys(data[0].variantData).length : 0


    const handlePublished = async () => {
        if (varIds.length === 0) {
            toast.warn('Please select atleast one variant to publish')
        } else {
            try {
                let formData = new FormData();
                formData.append('varIds', varIds)
                const res = await api.publishedAttribute(formData)
                console.log(res)
                if (res && res.data.length > 0) {
                    toast.success(res.message)
                    setVarIds([])
                    mutate()
                }
            } catch (err) {
                toast.error('Something went wrong')
            }
        }

    }

    const handleChecked = (e, item) => {
        if (e.target.checked) {
            setVarIds([...varIds, item])
        } else {
            setVarIds(varIds.filter(id => id !== item))
        }
    }
    console.log(varIds)

    return (
        <div className='row'>
            {/* <DataTable
                columns={columns}
                data={tableRow}
                pagination
                customStyles={customStyles}
            /> */}
            <div className='col-md-12'>
                <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Sl#</th>
                                <th rowSpan={2}>Brand Name</th>
                                <th rowSpan={2}>Product Name</th>
                                <th rowSpan={2}>Category Name</th>
                                <th colSpan={colspan} style={{ maxWidth: "200px" }}>Variant Data</th>
                                {/* <th rowSpan={2}>Action</th> */}
                            </tr>

                            <tr>
                                {
                                    data && data.length > 0 && Object.keys(data[0].variantData).map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))
                                }
                            </tr>

                            {
                                data?.map((item, index) => {
                                    console.log(item)
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.product.brand.brandName}</td>
                                            <td>{item.product.productTitle}</td>
                                            <td>{item.product.category.categoryName}</td>
                                            {
                                                Object.entries(item.variantData).map((itemm, index) => (
                                                    <td key={index}>{Object.keys(itemm[1]).map((key) => (
                                                        <span className='ml-1' style={{ borderRight: "1px solid #ccc", padding: "8px" }}>{key}</span>
                                                    ))}
                                                    </td>
                                                ))
                                            }
                                            {/* <td><input type="checkbox" onChange={(e) => handleChecked(e, item.variantId)} /> </td> */}
                                        </tr>
                                    )
                                })
                            }
                        </thead>
                    </table>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-12 center'>
                        <button className="btn btn-danger ml-2 btn-sm" onClick={() => router.back()}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublishedList