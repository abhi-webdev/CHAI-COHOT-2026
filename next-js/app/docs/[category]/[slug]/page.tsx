import React from 'react'

async function MultipleDynamicRouting({params} : {params: Promise<{category: String, slug: String}>}) {
    const {category, slug} = await params
  return (
    <div>MultipleDynamicRouting {category} : {slug}</div>
  )
}

export default MultipleDynamicRouting