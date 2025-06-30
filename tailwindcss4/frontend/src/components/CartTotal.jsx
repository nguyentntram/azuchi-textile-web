import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text2={'TỔNG ĐƠN HÀNG'} />
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Chi phí sản phẩm</p>
                <p>{getCartAmount().toLocaleString()}{currency}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Phí ship</p>
                <p>{delivery_fee.toLocaleString()}{currency}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Tổng cộng</b>
                <b>{getCartAmount() === 0 ? 0 : (getCartAmount() + delivery_fee).toLocaleString()}{currency}</b>
            </div>
        </div>

      
    </div>
  )
}

export default CartTotal
