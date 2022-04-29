import React from 'react'
import { useGetUserOrderQuery } from '../../redux/services/apiSlice';
import Table from "../SellerDashboard/table/Table"
const UserOrders = ({id}) => {
    
    const {data: orders} = useGetUserOrderQuery(id);
  
  return (
    <div>
        <Table orders={orders}/>
    </div>
  )
}

export default UserOrders;