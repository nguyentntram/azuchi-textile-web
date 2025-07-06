import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* for routing */}
  <ShopContextProvider>  {/* for customing app content */}
    <App /> 
  </ShopContextProvider>
  </BrowserRouter>,
)
