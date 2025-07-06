// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import axios from 'axios';

// const Order = () => {
//   const { products, orderItems, currency, backendUrl, token } = useContext(ShopContext);

//   const [orderData,setorderData] = useState([])

//   const loadOrderData = async () => {
//     try {
//       if (!token) {
//         return null
//       }

//       const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
//       if(response.data.success) {
//         let allOrdersItem = []
//         response.data.orders.map((order) => {
//           order.items.map((item) => {
//             item['status'] = order.status
//             item['payment'] = order.payment
//             item['paymentMethod'] = order.paymentMethod
//             item['date'] = order.date
//             allOrdersItem.push(item)
//           })
//         })
//         setorderData(allOrdersItem.reverse())
//       }
//     } catch(error) {

//     }
//   }

//   useEffect(()=>{
//     loadOrderData()
//   },[token])

//   return (
//     <div className='border-t pt-16'>

//       <div className='text-2xl'>
//         <Title text2={'ĐƠN HÀNG CỦA TÔI'} />
//       </div>

//       <div>
//         {orderItems.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10">Bạn chưa có đơn hàng nào.</p>
//         ) : (
//           orderItems.map((item, index) => {
//             const product = products.find(p => p._id === item._id);
//             return (
//               <div key={index} className='py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between'>
//                 <div className='flex items-start gap-6 text-sm'>
//                   <img className='w-16 sm:w-20' src={product?.image[0]} alt="product" />
//                   <div>
//                     <p className='sm:text-base font-medium'>{product?.name}</p>
//                     <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
//                       <p className='text-lg'>{(item.price * item.quantity).toLocaleString()}{currency}</p>
//                       <p>Số lượng: {item.quantity}</p>
//                       <p>Kích thước: {item.size}</p>
//                     </div>
//                     <p className='mt-2'>Thời gian: <span className='text-gray-400'>{item.date}</span></p>
//                   </div>
//                 </div>
//                 <div className='md:w-1/2 flex justify-between'>
//                   <div className='flex items-center gap-2'>
//                     <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                     <p className='text-sm md:text-base'>Sẵn sàng giao hàng</p>
//                   </div>
//                   <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Theo dõi đơn hàng</button>
//                 </div>
//               </div>
//             )
//           })
//         )}
//       </div>
      
//     </div>
//   )
// }

// export default Order

import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token , currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        console.log(response.data.orders); 
        console.log("FULL ORDER:", response.data.orders[0]);
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            console.log('ITEM IN ORDER:', item);
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['price'] = item.pr?.[0]?.price || 0;
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])


  return (
    <div className='border-t pt-16'>

        <div className='text-2xl'>
            <Title text2={'ĐƠN HÀNG CỦA TÔI'} />
        </div>

        <div>
            {
              orderData.map((item,index) => {
                const price = item.pr?.[0]?.price || 0;
                return (

                <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    
                    <div className='flex items-start gap-6 text-sm'>
                        <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                        
                        <div>

                          <p className='sm:text-base font-medium'>{item.name}</p>
                          <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                            <p>{(item.price * item.quantity).toLocaleString()}{currency}</p>
                            <p>Số lượng: {item.quantity}</p>
                            <p>Kích thước: {item.size}</p>
                          </div>
                          <p className='mt-1'>Thời gian: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                          <p className='mt-1'>Thanh toán: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between'>
                        <div className='flex items-center gap-2'>
                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                            <p className='text-sm md:text-base'>{item.status}</p>
                        </div>
                        <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Theo dõi đơn hàng</button>
                    </div>
                </div>
                )
})
            }
        </div>
    </div>
  )
}

export default Orders
