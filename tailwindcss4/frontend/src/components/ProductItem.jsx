import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, pr}) => {
    const {currency} = useContext(ShopContext);
    const minPrice = Array.isArray(pr) ? Math.min(...pr.map(p => p.price)) : 0;
    const maxPrice = Array.isArray(pr) ? Math.max(...pr.map(p => p.price)) : 0;
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img className='w-full h-[300px] object-cover hover:scale-110 transition ease-in-out' src={image[0]} alt='' />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>
          {minPrice.toLocaleString()} - {maxPrice.toLocaleString()} {currency}
        </p>
      
    </Link>
  )
}

export default ProductItem
