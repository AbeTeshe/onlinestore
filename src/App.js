import React, { useState, useEffect } from "react";
//import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Home, Checkout, OrderSuccess,   ProductDetails, Auth, UserProfile } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from './redux/apiCalls/product';
import Footer from "./components/footer/Footer";

const App = () => {
  const [searchField, setSearchField] = useState("");
  //const [products, setProducts] = useState();
  const authData = useSelector((state) => state.auth?.authData);
  const products =  useSelector(state => state?.product?.products);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  

  useEffect(() => {
    getProduct(dispatch);
    
  }, [searchField,dispatch]);
 
  return (
    <Router>
      <div>
        <Navbar searchField={searchField} 
              setSearchField={setSearchField} 
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              handleClose={handleClose}
              />
        <Switch >
          <Route exact path="/">
            <Products searchField={searchField} products={products} />
          </Route>
          <Route exact path="/cart">
            <Cart handleClose={handleClose}/>
          </Route>
          <Route exact path="/product/:Pid">
            <ProductDetails/>
          </Route>
          <Route exact path="/login" >
            <Auth />
          </Route>
          <Route  exact path="/userProfile">
             <UserProfile/>
          </Route>
          <Route  exact path="/orderSuccess">
            <OrderSuccess/>
          </Route> 
          <Route  exact path="/admin">
             <Home/>
          </Route>
         
          <Route exact path="/checkout">
            <Checkout/>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
