import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const[productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description');
  const [tab, setTab] = useState("MÔ TẢ");
  
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId])

  // Find min max
  const minPrice = productData && productData.pr && productData.pr.length > 0
    ? Math.min(...productData.pr.map(p => p.price))
    : 0;

  const maxPrice = productData && productData.pr && productData.pr.length > 0
    ? Math.max(...productData.pr.map(p => p.price))
    : 0;

  const selectedPrice = size && productData && productData.pr
    ? productData.pr.find(p => p.size.replace(/\s+/g, '') === size.replace(/\s+/g, ''))?.price
    : null;

  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/*-------------- Product Data -----------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*----------- Product images -----------*/}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* ------ Product in4 ----- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2x1 mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {selectedPrice
              ? `${selectedPrice.toLocaleString()} ${currency}`
              : (minPrice > 0 && maxPrice > 0
                  ? `${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} ${currency}`
                  : 'Liên hệ')}
          </p>
          {/* <p className='mt-5 text-gray-500 md:w-4/5 whitespace-pre-line'>{productData.description}</p> */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Chọn kích thước</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ?  'border-orange-500': ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>THÊM VÀO GIỎ HÀNG</button>
          {/* <hr className='mt-8 sm:w-4/5' /> */}

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Hàng gia công??</p>
            <p>Có thể thanh toán trực tiếp đối với sản phẩm này</p>
            <p>Đổi trả trong vòng 7 ngày</p>
          </div>
        </div>
      </div>

      {/* ----- Description ---- */}
      <div className='mt-10'>
        <div className='flex justify-center border-b'>
          <button
            className={`px-5 py-3 text-lg font-bold ${tab === "MÔ TẢ" ? "border-b-2 border-black text-black" : "text-gray-400"}`}
            onClick={() => setTab("MÔ TẢ")}
          >
            MÔ TẢ
          </button>

          <button
            className={`px-5 py-3 text-lg font-bold ${tab === "BỔ SUNG" ? "border-b-2 border-black text-black" : "text-gray-400"}`}
            onClick={() => setTab("BỔ SUNG")}
          >
            BỔ SUNG
          </button>
          {/* <button className="px-5 py-3 text-sm border-gray-300 bg-white">ĐÁNH GIÁ (122)</button> */}
        </div>
        
        {/* Description content */}
        <div className='p-0 text-sm text-gray-600'>
          {tab === "MÔ TẢ" && (
            <p className='text-gray-500 w-full sm:w-[80%] mx-auto whitespace-pre-line'>
              {productData.description}
            </p>
          )}

          {tab === "BỔ SUNG" && (
            <div className="flex flex-col items-center gap-4 mt-4">
              <img src={assets.instruction} alt="Hướng dẫn size" className="w-full sm:w-3/4"/>
            </div>
          )}
        </div>
      </div>

      {/* ------ Display related products --------- */}

      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />

      
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
