import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';


const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');

  // LẤY TOÀN BỘ TỪ CONTEXT
  // const { cartItems, setCartItems, placeOrder, navigate, backendUrl, token, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const { cartItems, setCartItems, placeOrder, navigate, backendUrl, token, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    district: '',
    city: '',
    phone: ''
  })
  

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({...data, [name]: value}))
  } 

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log('button clicked');
    try {
      let orderItems = []

      for(const items in cartItems) {
        for (const item in cartItems[items]) {
          if(cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(method) {
        // API calls for COD
        case 'cod': 
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}})
          console.log(response.data)
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        default:
          break;
      }
      
    } catch (error) {
      console.error('order failed!:', error);
      toast.error(error.message)
    }
  }

  // 🌟 HÀM MỚI - XỬ LÝ ĐẶT HÀNG
  const handlePlaceOrder = () => {
    Object.keys(cartItems).forEach(itemId => {
      Object.keys(cartItems[itemId]).forEach(size => {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          placeOrder(itemId, size, quantity);
         }
      });
    });
    navigate('/orders');
  };


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ----------- LEFT SIDE --------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Họ' />
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Tên' />
        </div>
        
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Email' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Địa chỉ giao hàng' />
        
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='district' value={formData.district} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Quận/Huyện' />
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Tỉnh/Thành phố' />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Số điện thoại' />
        
      </div>
      
      {/* --------- RIGHT SIDE ----------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        
        <div  className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* ----- PAYMENT METHOD SELECTION ---- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} />
            </div>

            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border  border-gray-200 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>THANH TOÁN TRỰC TIẾP</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>ĐẶT HÀNG</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
