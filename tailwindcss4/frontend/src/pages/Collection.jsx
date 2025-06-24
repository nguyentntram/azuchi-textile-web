import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) => {
          const aMin = Math.min(...a.pr.map(p => p.price));
          const bMin = Math.min(...b.pr.map(p => p.price));
          return aMin - bMin;
        }));

        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) => {
          const aMax = Math.max(...a.pr.map(p => p.price));
          const bMax = Math.max(...b.pr.map(p => p.price));
          return bMax - aMax;
        }));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>LỌC
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>THỂ LOẠI</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Rèm vải'} onChange={toggleCategory}/> Rèm vải
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Khăn trải bàn'} onChange={toggleCategory}/> Khăn trải bàn
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Rèm truyền thống'} onChange={toggleCategory}/> Rèm truyền thống
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Rèm Noren'} onChange={toggleCategory}/> Rèm Noren
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Rèm cầu vồng'} onChange={toggleCategory}/> Rèm cầu vồng
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Rèm tổ ong'} onChange={toggleCategory}/> Rèm tổ ong
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Rèm cuốn'} onChange={toggleCategory}/> Rèm cuốn
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>KIỂU?</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Vải lọc sáng'} onChange={toggleSubCategory}/> Vải lọc sáng
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Vải voan'} onChange={toggleSubCategory}/> Vải voan
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Khăn họa tiết'} onChange={toggleSubCategory}/> Khăn họa tiết
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Khăn một màu'} onChange={toggleSubCategory}/> Khăn một màu
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Vải cản sáng Hàn Quốc'} onChange={toggleSubCategory}/> Vải cản sáng Hàn Quốc
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Vải Jacquard'} onChange={toggleSubCategory}/> Vải Jacquard
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Vải linen'} onChange={toggleSubCategory}/> Vải linen
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Vải một màu'} onChange={toggleSubCategory}/> Vải một màu
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Vải voan họa tiết lớn'} onChange={toggleSubCategory}/> Vải voan họa tiết lớ
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Vải voan họa tiết nhẹ - trơn'} onChange={toggleSubCategory}/> Vải voan họa tiết nhẹ - trơn
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Rèm noren họa tiết'} onChange={toggleSubCategory}/> Rèm noren họa tiết
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Rèm noren linen'} onChange={toggleSubCategory}/> Rèm noren linen
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Rèm voan noren'} onChange={toggleSubCategory}/> Rèm voan noren
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'TẤT CẢ'} text2={'SẢN PHẨM'} />
            {/* Porduct Sort */}
            <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Lọc theo: Mặc định</option>
              <option value="low-high">Lọc theo: Giá thấp đến cao</option>
              <option value="high-low">Lọc theo: Giá cao đến thấp</option>
            </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} pr={item.pr} image={item.image} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
