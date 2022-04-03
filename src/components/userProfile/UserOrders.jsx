import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUserOrder } from '../../redux/apiCalls/orderApiCalls';

const UserOrders = () => {
    const orders = useSelector(state=> state.order.orders);
    const userProfile = useSelector((state) => state.userProfile.userProfile);
    console.log(userProfile[0]._id);
    
    const dispatch = useDispatch();

    useEffect(() => {
      getUserOrder(userProfile[0]?._id, dispatch);
    }, [dispatch, userProfile]);
    console.log(orders);
    
  return (
    <div>
        <h1>The orders are</h1>
        {orders?.map((item) => (
            <div>
               {item.orderItems.map((order) => (
                 <ul style={{listStyle: 'none', display: 'flex', justifyContent: 'space-between'}}>
                    <li>{order.name}</li>
                    <li>{order.quantity}</li>
                    <li>{`$${order.price}`}</li>
                 </ul>
               ))}
               
            </div>
        ))}
    </div>
  )
}

export default UserOrders;