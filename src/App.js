import React, { useState, useEffect } from "react";
//import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout, PrivateRoute, SellerDashboard,  ProductDetails, Auth, UserProfile } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
//import { createProduct } from './core/mainSlice';
import {dummyProducts} from "./mock/mockData";


const App = () => {
  //const [products, setProducts] = useState([]);
  const [searchField, setSearchField] = useState("");
  const dispatch = useDispatch();

  const products = useSelector((state) => state?.main?.products);

  // useEffect(() => {
  //   const getProducts = () => {
  //                  fetch('https://ipfs.infura.io/ipfs/QmVr4x7ifbJr2hqRSvfkhfRwgCQqbKUqdy8p8LdFSQSa5R')
  //                       .then((res) => res.json())
  //                       .then((res) => {
  //                         console.log(res);
  //                         setProducts(res.data);
  //                       });
  //   }
  //   getProducts();
  // }, []);
 
  return (
    <Router>
      <div>
        <Navbar searchField={searchField} setSearchField={setSearchField} />
        <Switch>
          <Route exact path="/">
            <Products searchField={searchField} />
          </Route>

          <Route exact path="/cart">
            <Cart/>
          </Route>
          {/* <PrivateRoute> */}
          <Route exact path="/seller">
            <SellerDashboard products={products}/>
          </Route>
          <Route exact path="/product/:Pid">
            <ProductDetails products={products}/>
          </Route>
          <Route exact path="/login">
            <Auth/>
          </Route>
          <Route  exact path="/userProfile">
             <UserProfile/>
          </Route>
          {/* </PrivateRoute> */}
          <Route exact path="/checkout">
            <Checkout/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
