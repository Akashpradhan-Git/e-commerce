import { PageLayout, PageName, MainLayout } from '../../../components/index'
import { AddProduct, AddAttributes, SellerAddProductVariant } from '../../../components/page_components/index'
import { useState } from 'react'
import style from '../../../styles/custom.module.css'
const addProduct = () => {
    // const dispatch = useDispatch();
    // const handleNext = () => {
    //     dispatch(setNextPageStep())
    // }
    // const handleBack = () => {
    //     dispatch(setPreviousPageStep())
    // }

    const [step, setStep] = useState(3)

    const handleNext = () => {
        setStep(step + 1)
    }
    const handleBack = () => {
        setStep(step - 1)
    }


    return (
        <>
            <PageLayout>
                <PageName title="Add Product" />
                <ul className={style.steps}>
                    <li className={`${style.step} ${style.step__incomplete} ${step == 1 ? style.step__active : style.step__inactive}`}>
                        <span className={style.step__icon}></span>
                        <span className={style.step__label}>Step 1</span>
                    </li>
                    <li className={`${style.step} ${style.step__incomplete} ${step == 2 ? style.step__active : style.step__inactive}`}>
                        <span className={style.step__icon}></span>
                        <span className={style.step__label}>Step 2</span>
                    </li>
                    <li className={`${style.step} ${style.step__incomplete} ${step == 3 ? style.step__active : style.step__inactive}`}>
                        <span className={style.step__icon}></span>
                        <span className={style.step__label}>Step 3</span>
                    </li>
                    {/* <li className={`${style.step} ${style.step__incomplete} ${step == 4 ? style.step__active : style.step__inactive}`}>
                        <span className={style.step__icon}></span>
                        <span className={style.step__label}>Step 4</span>
                    </li> */}
                </ul>

                {
                    step === 1 ?
                        <AddProduct handleNext={handleNext} />
                        :
                        step === 2 ?
                            <SellerAddProductVariant handleNext={handleNext} handleBack={handleBack} />
                            :
                            step === 3 ?
                                <AddAttributes handleBack={handleBack} />
                                : ""
                    //     step === 4 ?
                    //         <AddProductStep4 handleBack={handleBack} />
                    //         : ""


                }
            </PageLayout>
        </>
    )
}
addProduct.Layout = MainLayout;
export default addProduct