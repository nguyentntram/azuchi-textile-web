import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo2} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            AZUCHI TEXTILE VIETNAM là đơn vị sản xuất, dệt, nhuộm, may và phân phối rèm vải cao cấp theo tiêu chuẩn Nhật Bản.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>CÔNG TY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Trang chủ</li>
                <li>Giới thiệu</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>LIÊN LẠC</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>0903827465</li>
                <li>gioinguyen@gmail.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>2025@ Bản quyền thuộc về AZUCHI TEXTILE VIETNAM</p>
        </div>

    </div>
  )
}

export default Footer
