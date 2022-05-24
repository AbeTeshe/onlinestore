import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { emptyCart } from '../../redux/reducers/cartSlice';
import { publicRequest } from '../../requestMethod';
import {useGetUserProfilesQuery} from "../../redux/services/apiSlice";
import {setAppPage, resetStripeData} from "../../redux/reducers/stateSlices";

const OrderSuccess = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.states.stripeData);
    const cartItems = useSelector((state) => state.cart.cartItems);
   
    const user = useSelector((state) => state.auth.authData);
    const {data: userProfiles} = useGetUserProfilesQuery();
    const userProfile = userProfiles?.find((profile) => profile?.userId === user?.result?.googleId)
    
    const [orderId, setOrderId] = useState(null);
    

    let total = 0;
    for(let i=0; i< cartItems.length; i++){
      total = total + cartItems[i]?.totalPrice;
  }
   
    useEffect(() => {
      const createOrder = async() => {
        try {
          const res = await publicRequest.post("/orders", {
              userId: userProfile?._id,
              orderItems: cartItems.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              image: item.image,
              price: item.price,
            })),
            shippingAddress: {
              fullName: `${userProfile?.firstName} ${userProfile?.lastName}`,
              address: userProfile?.addressLine1,
              city: userProfile?.city,
              postalCode: userProfile?.zipCode,
              country: userProfile?.country
            },
            orderStatus: 'Pending',
            totalPrice: total,
          });
          setOrderId(res.data._id);
        } catch (error) {
          console.log(error);
        }
        
      };
      data && createOrder();
      dispatch(emptyCart());
      dispatch(resetStripeData());
      
    },[cartItems, data, userProfile, dispatch]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }} onClick={() => dispatch(setAppPage("productPage"))} >Go to Homepage</button>
    </div>
  )
}

export default OrderSuccess