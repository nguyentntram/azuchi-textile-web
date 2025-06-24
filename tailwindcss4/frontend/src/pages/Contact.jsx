import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

      <div className='w-full h-[400px] mb-10 pt-10 border-t'>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.9766030455366!2d106.6809885!3d10.8893825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d7cdeb94ae5d%3A0xcb4df0868b088390!2zNDAgxJAuIFRYNDAsIFRo4bqhbmggWHXDom4sIFF14bqtbiAxMiwgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2sus!4v1750691546741!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
      <div className='text-center text-2xl pt-10'>
          <Title text1={'LIÊN HỆ VỚI '} text2={'AZUCHI TEXTILE VIETNAM'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Địa chỉ công ty</p>
          <p className=' text-gray-500'>40/4/2 Thạnh Xuân 40, TP.HCM</p>
          <p className=' text-gray-500'>Tel: 0903 827 465 <br /> Email: admin@forever.com <br />Giờ hoạt động: 07:30 - 17:00</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
