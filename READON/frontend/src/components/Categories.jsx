import React from 'react'
import { assets, categories } from '../assets/assets'
import { useAppContext } from './AppContext'


const Categories = () => {

  const {navigate} = useAppContext()  
   return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Categories</p>
        <div className='grid grid-cols-2  sm:grid-cols-3 md:grid-col-5 lg:grid-col-6 xl:grid-col-7 mt-6 gap-6'>

          {categories.map((category, index)=>
            (<div key={index} style={{backgroundColor: category.bgColor}} 
            onClick={() =>{navigate(`/products/${category.path.toLowerCase()}`)
            scrollTo(0,0)
          } }
            className='group  cursor-pointer py-6 gap-2 rounded-lg flex flex-col justify-center items-center'>
            <img src={category.image} alt={category.text} className='group-hover:scale-108 transition max-w-30' />
            <p className='text-sm font-medium'>{category.text}</p>
            </div>)
          )}
          
            
        </div>
    </div>
  )
}

export default Categories