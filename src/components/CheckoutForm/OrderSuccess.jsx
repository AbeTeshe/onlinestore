import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation , Link} from 'react-router-dom';
import { publicRequest } from '../../requestMethod';
import { emptyCart } from "../../redux/reducers/cartSlice";

const OrderSuccess = () => {
    const location = useLocation();
    const data = location.state.stripeData;
    const cartItems = location.state.orderItems;
    const total = location.state.total;
    console.log(cartItems);
    console.log(data);
    const userProfile = useSelector((state) => state.userProfile.userProfile);
    const [orderId, setOrderId] = useState(null);
    const dispatch = useDispatch();
   
    useEffect(() => {
      const createOrder = async() => {
        try {
          const res = await publicRequest.post("/orders", {
            userId: userProfile[0]._id,
            orderItems: cartItems.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              image: item.image,
              price: item.price,
            })),
            shippingAddress: {
              fullName: `${userProfile[0]?.firstName} ${userProfile[0].lastName}`,
              address: userProfile[0]?.addressLine1,
              city: userProfile[0]?.city,
              postalCode: userProfile[0].zipCode,
              country: userProfile[0].country
            },
            orderStatus: 'succedded',
            totalPrice: total,
          });
          setOrderId(res.data._id);
        } catch (error) {
          console.log(error);
        }
      };
      data && createOrder();
      dispatch(emptyCart());
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
      <Link to="/"><button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button></Link>
    </div>
  )
}

export default OrderSuccess