import React from 'react'
import { InputField, CustomSelect } from '../index'
import * as api from '../../services/productApi'
import { useState, useRef } from 'react'
import useSWR from 'swr'
import { v4 as uuidv4 } from 'uuid';
import ProductList from './ProductList'

const PublishProduct = () => {

    // const router = useRouter()
    const refContainer = useRef(null);
    const [isLoading, setIsLoading] = useState(false); // loading state
    const [formData, setFormData] = useState([])
    const [storeId, setStoreId] = useState([])
    const [product, setProduct] = useState([])



    //* get all category list
    const { data } = useSWR('/product-master/get-all-headers-p-categories', api.getAllProductCategories);
    const options = [
        { label: 'Select Category', value: '' },
    ]
    if (data) {
        data.map(d => {
            options.push({
                "value": d.categoryCode,
                "label": d.categoryName
            })
        })
    }






    const handleFirstCategoryChange = (value) => {
        if (value.value !== "") {
            fetchData(value)
        }
        setStoreId([])
        setFormData([])
    }

    let r = [];
    const handleCategoryChange = async (e) => {

        const [name, value] = e.target;
        setStoreId(v => [...v, value.value])
        fetchData(value);

        r.push(refContainer.current.name)
        let checkCat = hasDuplicates(r)
        if (checkCat) {
            //    empty the array
            alert("You can't change the category again to do so please change the category")
            r = []
            setFormData([])
            setStoreId([])
        }
    }

    function hasDuplicates(array) {
        var valuesSoFar = [];
        for (var i = 0; i < array.length; ++i) {
            var value = array[i];
            if (valuesSoFar.indexOf(value) !== -1) {
                return true;
            }
            valuesSoFar.push(value);
        }
        return false;
    }


    const fetchData = async (value) => {
        const response = await api.getAllSubCategories(value.value)

        let dropdownData = []

        if (response && response.data.length > 0) {
            response.data.map(d => {
                dropdownData.push({
                    "value": d.categoryCode,
                    "label": d.categoryName
                })
            })
            setFormData(currentArray => {
                return [...currentArray, getDropdownValue(dropdownData, value.label)]
            })

        }
        else {
            console.log("value", value.value)
            const res = await api.getAllProductByID(value.value)
            setProduct(res)
        }
    }


    function getDropdownValue(dynamicOption, label = "Select Sub Category") {

        return (
            <div className='col-md-3' key={uuidv4()}>
                <div className="form-group">
                    <label htmlFor="input-field">Select from {label}</label>
                    <select className="form-control form-control-sm" name={label} ref={refContainer} onChange={handleCategoryChange}>
                        <option>--Select--</option>
                        {dynamicOption.map((d, i) => {
                            return (
                                <option key={i} value={d.value}>{d.label}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        )
    }

    //****** get dropdown value for brand



    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className='card-title'>
                            <h4>Publish Product</h4>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-md-3'>
                                    <CustomSelect
                                        isMulti={false}
                                        onChange={handleFirstCategoryChange}
                                        options={options}
                                        name="categoryMap"
                                        label={`Select from Category`}
                                        required={true}
                                    />
                                </div>
                                {
                                    formData ? formData : null
                                }
                            </div>



                            <div className='row'>
                                <div className='col-md-12'>


                                    <ProductList data={product} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublishProduct