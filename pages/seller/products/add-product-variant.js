import SellerAddProductVariant from '../../../components/page_components/SellerAddProductVariant'
import { PageName, PageLayout, MainLayout } from '../../../components/index'


import { useState } from 'react'

const addProductVariant = () => {

  return (
    <>
      <PageLayout>
        <PageName title="Add Product Variants" />

        <SellerAddProductVariant />
      </PageLayout>
    </>
  )
}

addProductVariant.Layout = MainLayout;
export default addProductVariant
