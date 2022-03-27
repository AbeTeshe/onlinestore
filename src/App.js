import React, { useState, useEffect } from "react";
//import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout, PrivateRoute, SellerDashboard,  ProductDetails, Auth, UserProfile } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
//import { createProduct } from './core/mainSlice';
import {dummyProducts} from "./mock/mockData";


const App = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchField, setSearchField] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
      const filteredProduct = products?.filter((product) => product.name?.toLowerCase().includes(searchField.toLowerCase()));
      setFilteredProducts(filteredProduct ? filteredProduct: []);
  }, [searchField]);

  

  return (
    <Router>
      <div>
        <Navbar searchField={searchField} setSearchField={setSearchField} />
        <Switch>
          <Route exact path="/">
            <Products products={!filteredProducts.length ? products: filteredProducts} />
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
      </div>6
    </Router>
  );
};

export default App;
