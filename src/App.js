import React, { useState, useEffect } from "react";
//import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Home, Checkout, OrderSuccess,   ProductDetails, Auth, UserProfile } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {  useSelector } from 'react-redux';

import Footer from "./components/footer/Footer";
import {useGetProductsQuery} from './redux/services/apiSlice';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const authData = useSelector((state) => state.auth.authData);
  const {data} = useGetProductsQuery();
  const [anchorEl, setAnchorEl] = useState(false);
  const products =  data?.filter((product) => product.isActive === true);
  const appPage = useSelector((state) => state.states.appPage);

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  return (
      <div>
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
      </div>
   
  );
};

export default App;
