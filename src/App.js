import React, { useState, useEffect } from "react";
//import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout, PrivateRoute, SellerDashboard } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
//import { createProduct } from './core/mainSlice';
import {dummyProducts} from "./mock/mockData";

const App = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [searchField, setSearchField] = useState("");


  const dispatch = useDispatch();

  const fetchProducts = async () => {
    // const { data } = await commerce.products.list();
    // setProducts(data);
    // //dispatch to update redux state
    // dispatch(createProduct(data));  
  };
  
  const fetchCart = async () => {
    // setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    // const item = await commerce.cart.add(productId, quantity);

    // setCart(item.cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    // const { cart } = await commerce.cart.update(productId, { quantity });

    // setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    // const { cart } = await commerce.cart.remove(productId);

    // setCart(cart);
  };

  const handleEmptyCart = async () => {
    // const { cart } = await commerce.cart.empty();

    // setCart(cart);
  };

  const refreshCart = async () => {
    // const newCart = await commerce.cart.refresh();

    // setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    // try {
    //   const incomingOrder = await commerce.checkout.capture(
    //     checkoutTokenId,
    //     newOrder
    //   );

    //   setOrder(incomingOrder);

    //   refreshCart();
    // } catch (error) {
    //   setErrorMessage(error.data.error.message);
    // }
  };

  useEffect(() => {
    const filteredProduct = products?.filter((product) => product.name?.toLowerCase().includes(searchField.toLowerCase()));
      setFilteredProducts(filteredProduct);
  }, [searchField, products]);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar searchField={searchField} setSearchField={setSearchField} />
        <Switch>
          <Route exact path="/">
            <Products products={!filteredProducts.length ? products: filteredProducts} onAddToCart={handleAddToCart} />
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={products}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          {/* <PrivateRoute> */}
          <Route exact path="/seller">
            <SellerDashboard products={products}/>
          </Route>
          {/* </PrivateRoute> */}
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
