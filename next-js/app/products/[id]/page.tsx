import React from 'react'

const ProductPage = async ({params} : {params: Promise<{id: String}>}) => {
    const {id} = await params
  return (
    <div>ProductPage {id}</div>
  )
}

export default ProductPage