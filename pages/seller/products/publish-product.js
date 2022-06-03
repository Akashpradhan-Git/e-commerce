import { PageName, PageLayout, MainLayout } from '../../../components/index'
import PublishProduct from '../../../components/page_components/PublishProduct'
import { useState } from 'react'

const publishProducts = () => {

  return (
    <>
      <PageLayout>
        <PageName title="Publish Product" />
        <PublishProduct />
      </PageLayout>
    </>
  )
}

publishProducts.Layout = MainLayout;
export default publishProducts
