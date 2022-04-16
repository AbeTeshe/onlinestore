import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUserOrder } from '../../redux/apiCalls/orderApiCalls';
import Table from "../SellerDashboard/table/Table"
const UserOrders = () => {
    const orders = useSelector(state=> state.order.orders);
    const userProfile = useSelector((state) => state.userProfile.userProfile);
    console.log(userProfile[0]._id);
    
    const dispatch = useDispatch();

    useEffect(() => {
      getUserOrder(userProfile[0]?._id, dispatch);
    }, [dispatch, userProfile]);
  
    
  return (
    <div>
        <Table orders={orders} isAdmin={false}/>
    </div>
  )
}

export default UserOrders;