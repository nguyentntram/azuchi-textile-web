import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [priceBySize, setPriceBySize] = useState({})
  const [category, setCategory] = useState('Rèm vải')
  const [subCategory, setSubCategory] = useState('Vải lọc sáng')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name", name || "")
      formData.append("description", description || "")
      formData.append("category", category || "")
      formData.append("subCategory", subCategory || "")
      formData.append("bestseller", JSON.stringify(bestseller))
      formData.append("sizes", JSON.stringify(sizes || []))

      let cleanedPriceBySize = {};
      if (priceBySize && sizes && sizes.length > 0){
        sizes.forEach(size => {
          const val = priceBySize[size];
          if (val !== undefined && val !== "" && !isNaN(Number(val))) {
            cleanedPriceBySize[size] = Number(val);
          }
        });
      }

      // console.log("sizes:", sizes);
      // console.log("priceBySize:", priceBySize);
      // console.log("cleanedPriceBySize:", cleanedPriceBySize);
      // console.log("JSON.stringify:", JSON.stringify(cleanedPriceBySize));

      const priceArray = sizes.map(size => {
        const val = priceBySize[size];
        if (val !== undefined && val !== "" && !isNaN(Number(val))) {
          return {
            size: size,
            price: Number(val)
          };
        }
        return null;
      }).filter(Boolean); // Filter valid value

      formData.append("pr", JSON.stringify(priceArray));

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      console.log([...formData.entries()]);

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})
      console.log(response.data)
      
      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPriceBySize('')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full item-start gap-3'>

      {/* ------ UPLOAD IMAGES ----- */}
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt='' />
            <input onChange={(e) => setImage1(e.target.files[0])} type='file' id="image1" hidden />
          </label>

          <label htmlFor='image2'>
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt='' />
            <input onChange={(e) => setImage2(e.target.files[0])} type='file' id="image2" hidden />
          </label>

          <label htmlFor='image3'>
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt='' />
            <input onChange={(e) => setImage3(e.target.files[0])} type='file' id="image3" hidden />
          </label>

          <label htmlFor='image4'>
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt='' />
            <input onChange={(e) => setImage4(e.target.files[0])} type='file' id="image4" hidden />
          </label>
        </div>
      </div>

      {/* ------ PRODUCT NAME ----- */}
      <div className='w-full'>
        <p className='mb-2'>Tên sản phẩm</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Nhập ở đây' required />
      </div>

      {/* ----- PRODUCT DESCRIPTION ----- */}
      <div className='w-full'>
        <p className='mb-2'>Mô tả sản phẩm</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Nhập ở đây' required />
      </div>
      
      {/* ----- PRODUCT CATEGORY AND SUBCATEGORY ----- */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Rèm vải">Rèm vải</option>
            <option value="Khăn trải bàn">Khăn trải bàn</option>
            <option value="Rèm truyền thống">Rèm truyền thống</option>
            <option value="Rèm Noren">Rèm Noren</option>
            <option value="Rèm cầu vồng">Rèm cầu vồng</option>
            <option value="Rèm tổ ong">Rèm tổ ong</option>
            <option value="Rèm cuốn">Rèm cuốn</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product subcategory</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="Vải lọc sáng">Vải lọc sáng</option>
            <option value="Vải voan">Vải voan</option>
            <option value="Khăn họa tiết">Khăn họa tiết</option>
            <option value="Khăn một màu">Khăn một màu</option>
            <option value="Vải cản sáng Hàn Quốc">Vải cản sáng Hàn Quốc</option>
            <option value="Vải Jacquard">Vải Jacquard</option>
            <option value="Vải linen">Vải linen</option>
            <option value="Vải một màu">Vải một màu</option>
            <option value="Vải voan họa tiết lớ">Vải voan họa tiết lớ</option>
            <option value="Vải voan họa tiết nhẹ - trơn">Vải voan họa tiết nhẹ - trơn</option>
            <option value="Rèm noren họa tiết">Rèm noren họa tiết</option>
            <option value="Rèm noren linen">Rèm noren linen</option>
            <option value="Rèm voan noren">Rèm voan noren</option>
          </select>
        </div>
      </div>

        {/* <div>
          <p className='mb-2'>Giá thành</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 h-9 sm:w-[120px]' type="number" placeholder='Giá tiền' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes("Ngang 140cm x cao 140cm") ? prev.filter(item => item !== "Ngang 140cm x cao 140cm") : [...prev, "Ngang 140cm x cao 140cm"])}>
            <p className={`${sizes.includes("Ngang 140cm x cao 140cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Ngang 140cm x cao 140cm</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("Ngang 200cm x cao 240cm") ? prev.filter(item => item !== "Ngang 200cm x cao 240cm") : [...prev, "Ngang 200cm x cao 240cm"])}>
            <p className={`${sizes.includes("Ngang 200cm x cao 240cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Ngang 200cm x cao 240cm</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("Ngang 140cm x cao 600cm") ? prev.filter(item => item !== "Ngang 140cm x cao 600cm") : [...prev, "Ngang 140cm x cao 600cm"])}>
            <p className={`${sizes.includes("Ngang 140cm x cao 600cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Ngang 140cm x cao 600cm</p>
          </div>
        </div>
      </div> */}


      {/* ----- PRODUCT SIZES & PRICES ----- */}
      <div>
        <p className='mb-2'>Product Sizes & Prices</p>
        <div className='flex gap-3 flex-wrap'>
          {["Ngang 140cm x cao 140cm", "Ngang 200cm x cao 240cm", "Ngang 140cm x cao 600cm"].map(size => (
            <div key={size}>
              <p onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])} className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                {size}
              </p>

              {sizes.includes(size) && (
                <input type="number" placeholder="Giá tiền" className="mt-1 px-2 py-1 border rounded w-[120px]" value={priceBySize[size] || ""} onChange={(e) => setPriceBySize(prev => ({...prev, [size]: e.target.value
                  }))}
                />
              )}
            </div>
          ))}
        </div>
      </div>


      {/* ----- PRODUCT BEST SELLER ------ */}
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
      </div>

      <button className='w-28 py-3 mt-4 bg-black text-white' type='submit'>ADD</button>
    </form>
    
  )
}

export default Add


// e.preventDefault(): when we submit a <form>, the default behavior is reload the page and send data to server (old)
// -> call it: prevent default behavior -> we can handle yhe logic using JS