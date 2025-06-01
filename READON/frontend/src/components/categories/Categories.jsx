import React from 'react'
import { assets } from '../../assets/assets'

const Categories = () => {
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Categories</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-col-5 lg:grid-col-6 xl:grid-col-7 mt-6 gap-2'>
            <img src={assets.box_icon} alt="boxicon" />
            <p>fruit</p>
        </div>
    </div>
  )
}

export default Categories