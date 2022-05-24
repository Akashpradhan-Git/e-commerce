import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { PageLayout, PageName, MainLayout, InputField, CustomSelect } from '../../../components/index'

function subCategory() {

    const [option, setOption] = useState({})

    function onChangeInput(value) {
    }
    async function getOption() {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        const data = res.data

        const options = data.map(d => ({
            "value": d.id,
            "label": d.name
        }))
        setOption(options)
    }
    useEffect(() => {
        getOption()
    }, [])

    if (option.length === 0) {
        console.log('loading')
    }

    const options = [
        { label: 'React', value: 'react' },
        { label: 'ReactNative', value: 'react-native' },
        { label: 'JavaScript', value: 'js' },
        { label: 'CSS', value: 'css' },
    ]


    return (
        <>
            <Head>
                <title>View Single User</title>
                <meta name="description" content="View Single user in e-commerces application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageLayout>
                <PageName title="Add Category" />

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-title'>
                                <h4>View User</h4>
                            </div>
                            <div className="card-body">
                                <form >
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <CustomSelect isMulti={false} onChange={onChangeInput} options={option} label="Choose a libary" />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={""}
                                                placeholder="Sub-Category Name"
                                                label="Sub-Category Name"
                                                name="subcategoryName"
                                                onChange={onChangeInput}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <InputField
                                                type="text"
                                                value={""}
                                                placeholder="Sub-Category Code"
                                                label="Sub-Category Code"
                                                name="subcategoryCode"
                                                onChange={onChangeInput}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayout>

        </>
    )
}

subCategory.Layout = MainLayout;
export default subCategory