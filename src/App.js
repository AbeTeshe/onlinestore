import React, { useState} from "react";
import { Products, Navbar, Cart, Home, Checkout, OrderSuccess,   ProductDetails, Auth, UserProfile, Footer } from "./components";
import {  useSelector } from 'react-redux';
import {useGetProductsQuery} from './redux/services/apiSlice';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const {data} = useGetProductsQuery();
  const [anchorEl, setAnchorEl] = useState(false);
  const products =  data?.filter((product) => product.isActive === true);
  const appPage = useSelector((state) => state.states.appPage);

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  return (
      <>
        <Navbar searchField={searchField} 
              setSearchField={setSearchField} 
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleClose={handleClose}
              />
        <ToastContainer autoClose={2000}/>
        {appPage==='productPage' && <Products searchField={searchField} products={products} />}
        {appPage==='cart' && <Cart handleClose={handleClose}/>}
        {appPage==='productDetails' && <ProductDetails/>}
        {appPage==='login' && <Auth />}
        {appPage==='userProfile' && <UserProfile/>}
        {appPage==="admin" && <Home />}
        {appPage==="orderSuccess" && <OrderSuccess/>}
        {appPage==="checkout" && <Checkout/>}
        <Footer />
      </>
   
  );
};

export default App;
