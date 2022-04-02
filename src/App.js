import React, { useState, useEffect } from "react";
//import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout, PrivateRoute, SellerDashboard,  ProductDetails, Auth, UserProfile } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from './redux/apiCalls/product';
import { publicRequest } from "./requestMethod";

const App = () => {
  const [searchField, setSearchField] = useState("");
  //const [products, setProducts] = useState();
  const authData = useSelector((state) => state.auth?.authData);
  const products =  useSelector(state => state?.product?.products);
  const dispatch = useDispatch();
  
  const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect(() => {
  //   const getUserProfile = async() => {
  //     try {
  //       const res = await publicRequest.get('/products');
  //       setProducts(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getUserProfile();
  // }, []);

  useEffect(() => {
    getProduct(dispatch);
    const filteredProduct = products?.filter((product) => product.name?.toLowerCase().includes(searchField.toLowerCase()));
    setFilteredProducts(filteredProduct ? filteredProduct: products);
  }, [searchField,dispatch]);
  console.log(products);
  return (
    <Router>
      <div>
        <Navbar searchField={searchField} setSearchField={setSearchField} />
        <Switch>
          <Route exact path="/">
            <Products searchField={searchField} products={filteredProducts} />
          </Route>

          <Route exact path="/cart">
            <Cart/>
          </Route>
          {/* <PrivateRoute> */}
          <Route exact path="/seller">
            <SellerDashboard />
          </Route>
          <Route exact path="/product/:Pid">
            <ProductDetails/>
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
