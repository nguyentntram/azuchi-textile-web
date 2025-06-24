import React, { createContext, useEffect, useState } from 'react';
import { products } from "../assets/assets";

export const ShopContext = createContext();

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ShopContextProvider = (props) => {
  const currency = '₫';
  const delivery_fee = 10;
  const [search, setSearch] =useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : {};
  });

  const [orderItems, setOrderItems] = useState(() => {
    const saved = localStorage.getItem("orderItems");
    return saved ? JSON.parse(saved) : [];
  });
  
  const navigate = useNavigate();

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
  }

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
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

  const value = {
    products, currency, delivery_fee, 
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart,
    getCartCount, updateQuantity,
    getCartAmount, navigate,
    orderItems, placeOrder
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
