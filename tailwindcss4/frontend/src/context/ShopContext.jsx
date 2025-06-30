import React, { createContext, useEffect, useState } from 'react';
// import { products } from "../assets/assets";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₫';
  const delivery_fee = 20000;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] =useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Declares a stable variable CartItems
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : {};
  });

  const [orderItems, setOrderItems] = useState(() => {
    const saved = localStorage.getItem("orderItems");
    return saved ? JSON.parse(saved) : [];
  });
  
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('')


  // Update the cart (add)
  const addToCart = async (itemId, size) => {

    if(!size) {
      toast.error('Vui lòng chọn kích thước');
      return;
    }

    let cartData = structuredClone(cartItems);

    if(cartData[itemId]) {

      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }

    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if(token) {

      try {
        await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
if (!productData || !productData.image) return null; 
    if(token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})

      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        const quantity = cartItems[items][size];
        if (quantity > 0) {
          totalCount += quantity;
        }
      }
    }
    return totalCount;
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const product = products.find(p => p._id === items);
      if (product) {
        for (const size in cartItems[items]) {
          const quantity = cartItems[items][size];
          if (quantity > 0) {
            const prItem = product.pr.find(p => p.size.replace(/\s+/g, '') === size.replace(/\s+/g, ''));
            if (prItem) {
              totalAmount += prItem.price * quantity;
            }
          }
        }
      }
    }
    return totalAmount;
  }

  const placeOrder = (itemId, size, quantity) => {
    const product = products.find(p => p._id === itemId);
    if (!product) {
      toast.error('Sản phẩm không tồn tại');
      return;
    }

    const prItem = product.pr.find(p => p.size.replace(/\s+/g, '') === size.replace(/\s+/g, ''));
    if (!prItem) {
      toast.error('Kích thước không hợp lệ');
      return;
    }

    setOrderItems(prev => [
      ...prev,
      {
        _id: itemId,
        size,
        quantity,
        price: prItem.price,
        date: new Date().toLocaleString()
      }
    ]);

    setCartItems({});
    localStorage.removeItem("cartItems");
    toast.success('Đặt hàng thành công!');
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
  }, [orderItems]);


  const getProductData = async () => {
    try {
      console.log("🌐 BACKEND_URL:", backendUrl);
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
        //console.log("Products from backend:", response.data.products)

      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const getUserCart = async ( token ) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
      if(response.data.success) {
        setCartItems(response.data.cartData)

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProductData();
  }, [])

  useEffect(() => {
    if(!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  }, [])

  const value = {
    products, currency, delivery_fee, 
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart,
    getCartCount, updateQuantity,
    getCartAmount, navigate, backendUrl,
    orderItems, placeOrder, setToken, token
  }

  // This wraps all children (app components) inside a provider that gives access to cart, functions,...
  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;

// Stores and shares data globally across components (cart items, orders, product filters,...) without passing props manually
// children: react special prop: whatever is inside <ShopContextProvider>////