import productModel from "../models/productModel.js"
import { v2 as cloudinary } from "cloudinary"
// Function for adding product
const addProduct = async(req, res) => {
    try {
        const { name, description, category, subCategory, bestseller } = req.body

        // let pr = req.body.pr;
        // let sizes = req.body.sizes;
        // // Parse string to array
        // pr = JSON.parse(pr);
        // sizes = JSON.parse(sizes);

        let pr = {};
        let sizes = [];

        try {
            pr = JSON.parse(req.body.pr || '{}');       // Nếu không có → dùng object rỗng
            sizes = JSON.parse(req.body.sizes || '[]'); // Nếu không có → dùng mảng rỗng
        } catch (e) {
            return res.status(400).json({ success: false, message: "Invalid JSON format in pr or sizes" });
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        const productData = {
            name, 
            description, 
            category, 
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            pr: pr,
            sizes: sizes,
            image: imageUrl,
            date: Date.now()
        }
        console.log(productData);
        const product = new productModel(productData)
        await product.save()

        // const image1 = req.files.image1[0]
        // const image2 = req.files.image2[0]
        // const image3 = req.files.image3[0]
        // const image4 = req.files.image4[0]

        // const image1 = req.files.image1 ? req.files.image1[0] : null;
        // const image2 = req.files.image2 ? req.files.image2[0] : null;
        // const image3 = req.files.image3 ? req.files.image3[0] : null;
        // const image4 = req.files.image4 ? req.files.image4[0] : null;

        console.log(name, description, pr, category, subCategory, sizes, bestseller)
        console.log(imageUrl)

        res.json({ success: true, message: "Product added" })
    } catch(error){
        console.log(error)
        
        res.json({success:false, message:error.message})
    }
}

// Function for listing product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true, products})
    } catch(error) {
        console.log(error)
        res.json({success:false, message: message.error})
    }

}

// Function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Product removed"})
    } catch(error) {
        console.log(error)
        res.json({success:false, message: message.error})
    }

}

// Function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true, product})
    } catch (error){
        console.log(error)
        res.json({success:false, message: message.error})
    }
}

export { addProduct, removeProduct, listProduct, singleProduct }