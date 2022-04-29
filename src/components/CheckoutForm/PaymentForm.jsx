import React, { useState, useEffect } from "react";
import {  Button, Divider } from "@material-ui/core";
import logo from "../../assets/commerce.png";
import Review from "./Review";
import StripeCheckout from "react-stripe-checkout";
import { useSelector, useDispatch } from "react-redux";
import {publicRequest} from "../../requestMethod";
import { useHistory } from "react-router-dom";


const KEY= "pk_test_51JsLJnL4ZN6qtyNcqFhgoeqjaNF789pAXWN47x1g59lfidILtJ8UXi9m0Y7lUxFp59yLIxbOktd2l9WbYgsZ3eQZ00buFYC6mi";

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout
}) => {
  
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  console.log(cartItems);

  let cartTotal = 0;
  for(let i=0; i< cartItems.length; i++){
    cartTotal = cartTotal + cartItems[i]?.totalPrice;
}

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async() => {
      try {
        const res = await publicRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cartTotal * 100,
        });
        history.push("/orderSuccess", {
          stripeData: res.data,
          orderItems: cartItems,
          total: cartTotal,
        });
        
      } catch (error) {
        console.log(error)
      }
    };

    stripeToken && makeRequest();
    
  }, [stripeToken, cartTotal]);

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: '20px' }}>
        <Button variant="outlined" onClick={backStep}>
          Back
        </Button>
        <StripeCheckout
            name="shopinext"
            image={logo}
            description={`Your total is $${cartTotal}`}
            amount = {cartTotal * 100}
            token={onToken}
            stripeKey={KEY}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Pay {checkoutToken?.live?.subtotal.formatted_with_symbol}
          </Button>
        </StripeCheckout>
      </div>
    </>
  );
};

export default PaymentForm;
