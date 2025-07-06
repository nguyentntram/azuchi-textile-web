import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='border-t pt-10 text-2xl text-center'>
          <Title text2={'AZUCHI - CHUYÊN GIA VẢI RÈM CAO CẤP'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.logo} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>AZUCHI TEXTILE VIETNAM được thành lập năm 2019, là đơn vị sản xuất, dệt, nhuộm, may và phân phối rèm vải cao cấp theo tiêu chuẩn nhật Bản. Với sự kết hợp giữa công nghệ dệt hiện đại và quy trình kiểm soát chất lượng nghiêm ngặt, chúng tôi mang đến những sản phẩm bền đẹp, an toàn và thân thiện với môi trường.</p>
              <p>Chúng tôi cung cấp hai dòng sản phẩm chính:
                <li><strong>Rèm vải lọc sáng (Light-filtering curtains)</strong> - Được dệt từ sợi màu cao cấp, giúp cân bằng ánh sáng, giảm chói, tăng tính thẩm mỹ cho không gian sống</li>
                <li><strong>Rèm ren (Lace curtains)</strong> - Thiết kế tinh tế, mềm mại, phù hợp với nhiều phong cách nội thất</li>
              </p>
              {/* <b className='text-gray-800'>Our Mission</b> */}
              <p><strong>Bộ sưu tập FUJI COLLECTION</strong> của chúng tôi bao gồm các mẫu sản xuất tại Việt Nam theo công nghệ Nhật Bản và nhập khẩu trực tiếp từ Nhật Bản, đáp ứng nhu cầu đa dạng của thị trường.</p>
              <p>Không chỉ tập trung vào chất lượng, chúng tôi còn phát triển các bộ sưu tập độc quyền, mang đậm phong cách Nhật Bản, giúp không gian sống trở nên tinh tế và hài hòa. Với hệ thống phân phối rộng khắp, AZUCHI TEXTILE VIETNAM cam kết mang đến cho khách hàng những sản phẩm bền đẹp, chất lượng vượt trội và giá trị lâu dài.</p>
          </div>
      </div>

      <div className='text-2xl text-center pt-8'>
          <Title text2={'TẦM NHÌN VÀ SỨ MỆNH'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <b className='text-gray-800'>TẦM NHÌN</b>
              <p>Trở thành thương hiệu vải rèm hàng đầu tại Việt Nam và khu vực với chất lượng đạt chuẩn Nhật Bản, đáp ứng nhu cầu đa dạng của khách hàng trong nước và quốc tế</p>
              <p>Dẫn đầu xu hướng thiết kế và công nghệ dệt nhuộm, mang đến những sản phẩm bền đẹp, thân thiện với môi trường và nâng tầm không gian sống</p>
            <b className='text-gray-800'>SỨ MỆNH</b>
              <p>Sản xuất và cung cấp vải rèm chất lượng cao, kết hợp giữa công nghệ Nhật Bản và sự khéo léo của đội ngũ nhân lực Việt Nam để tạo ra sản phẩm đạt chuẩn quốc tế</p>
              <p>Góp phần nâng cao thẩm mĩ và tiện nghi cho không gian sống, giúp khách hàng có trải nghiệm tốt hơn về ánh sáng, sự riêng tư và phong cách nội thất</p>
              <p>Phát triển bền vững, cam kết sử dụng nguyên liệu an toàn, quy trình thân thiện với môi trường, đảm bảo quyền lợi cho đối tác, khách hàng và người lao động</p>
              {/* <p>Chúng tôi cung cấp hai dòng sản phẩm chính:
                
              </p>
              <b className='text-gray-800'>Our Mission</b>
              <p>Bộ sưu tập FUJI COLLECTION của chúng tôi bao gồm các mẫu sản xuất tại Việt Nam theo công nghệ Nhật Bản và nhập khẩu trực tiếp từ Nhật Bản, đáp ứng nhu cầu đa dạng của thị trường.</p>
              <p>Không chỉ tập trung vào chất lượng, chúng tôi còn phát triển các bộ sưu tập độc quyền, mang đậm phong cách Nhật Bản, giúp không gian sống trở nên tinh tế và hài hòa. Với hệ thống phân phối rộng khắp, AZUCHI TEXTILE VIETNAM cam kết mang đến cho khách hàng những sản phẩm bền đẹp, chất lượng vượt trội và giá trị lâu dài.</p> */}
          </div>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      </div>

      <div className='text-2xl text-center pt-8'>
          <Title text2={'CHẤT LƯỢNG'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p><strong>Chất lượng sản phẩm rèm vải FUJI - Đẳng cấp từ AZUCHI TEXTILE VIETNAM</strong></p>
              <p>Rèm vải FUJI mang đến sự kết hợp hoàn hảo giữa chất lượng Nhật Bản và tay nghề tinh xảo của công nhân Việt Nam. Với các mẫu vải nhập trực tiếp từ Nhật Bản và những sản phẩm sản xuất tại Việt Nam theo công nghệ Nhật, rèm FUJI đảm bảo độ bền màu, khả năng cản nắng 99% và cản sáng 70-80%.</p>
              <p>Vải được dệt từ sợi màu cao cấp, giúp hạn chế phai màu theo thời gian. Chất liệu mềm mại, họa tiết tinh tế và khả năng chống cháy, không chứa formaldehyde và không dư lượng tẩy chất nhuộm, đảm bảo sức khỏe người dùng và đạt chuẩn an toàn. FUJI không chỉ mang lại vẻ đẹp sang trọng mà còn nâng cao trải nghiệm sống, phù hợp với mọi không gian từ truyền thống đến hiện đại.</p>
              <p>Với công nghệ dệt và nhuộm tiên tiến theo tiêu chuẩn Nhật Bản, rèm FUJI mang đếm không gian sang trọng, tinh tế và an toàn tuyệt đối cho gia đình bạn.</p>
          </div>
      </div>

      <div className='text-2xl text-center pt-8'>
          <Title text2={'SẢN XUẤT TRỰC TIẾP: DỆT NHUỘM - MAY'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p><strong>Sản phẩm rèm FUJI - Sản xuất trực tiếp tại nhà máy AZUCHI TEXTILE VIETNAM</strong></p>
              <p>Tất cả sản phẩm rèm FUJI đều được sản xuất trực tiếp tại nhà máy AZUCHI TEXTILE VIETNAM, đảm bảo chất lượng theo tiêu chuẩn Nhật Bản. Với các dòng vải dệt tại Việt Nam, quy trình sản xuất khép kín từ khâu dệt, nhuộm đến may hoàn thiện giúp kiểm soát chất lượng chặt chẽ, mang lại sản phẩm có độ bền cao, màu sắc ổn định và an toàn cho sức khỏe</p>
              <p>Đối với các sản phẩm sử dụng vải nhập từ Nhật Bản, AZUCHI TEXTILE VIETNAM chỉ nhập nguyên liệu vải thô, sau đó thực hiện toàn bộ công đoạn may tại Việt Nam. Điều này giúp tối ưu giá thành nhưng vẫn đảm bảo sự tinh tế và chuẩn mực của rèm Nhật Bản. Sự kết hợp giữa công nghệ tiên tiến và tay nghề cao của đội ngũ công nhân là yếu tố cốt lõi tạo nên chất lượng vượt trội của rèm FUJI.</p>
              <p>Với công nghệ dệt và nhuộm tiên tiến theo tiêu chuẩn Nhật Bản, rèm FUJI mang đếm không gian sang trọng, tinh tế và an toàn tuyệt đối cho gia đình bạn.</p>
          </div>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      </div>

      <div className='text-2xl text-center pt-8'>
          <Title text2={'HOA VĂN VÀ CHẤT LƯỢNG ĐỘC QUYỀN'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Vô số thiết kế đem đến cho khách hàng niềm say mê bất tận bởi sự biến hóa đa chiều của màu sắc và họa tiết. Là sự kết hợp hoàn hảo giữa chất lượng và sự tinh tế trong thiết kế.</p>
              <p>Bộ sưu tập FUJI là dòng sản phẩm rèm cửa cao cấp của AZUCHI TEXTILE VIETNAM, kết hợp giữa công nghệ dệt may Nhật Bản và sự tinh tế trong thiết kế. FUJI mang đến những mẫu rèm chất lượng, đáp ứng nhu cầu đa dạng của người tiêu dùng.</p>
              <p>Nhờ vào công nghệ dệt tiên tiến, các thiết kế không chỉ đẹp mắt mà còn có độ bền cao, giúp duy trì nét thẩm mĩ theo thời gian.</p>
          </div>
      </div>

      {/* <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div> */}

      <NewsletterBox/>
      
    </div>
  )
}

export default About
