import React from 'react'
import { useSelector } from 'react-redux';

const UserOrders = () => {
    const cartItems = useSelector(state=> state.cart.cartItems);
    console.log(cartItems);
  return (
    <div>
        <h1>The orders are</h1>
        {cartItems.map((item) => {
            <div>
                <h1>{item.name}</h1>
                <h1>{item.totalPrice}</h1>
                <h1>{item.quantity}</h1>
            </div>
        })}
    </div>
  )
}

export default UserOrders;