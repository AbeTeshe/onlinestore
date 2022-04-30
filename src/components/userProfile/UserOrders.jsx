import React from 'react'
import { useGetUserOrderQuery, useGetUserProfilesQuery } from '../../redux/services/apiSlice';
import Table from "../SellerDashboard/table/Table";
import { useSelector } from 'react-redux';

const UserOrders = () => {
  const user = useSelector((state) => state.auth.authData);
  const {googleId, givenName, familyName,  email} = user?.result;
  const {data: userProfiles} = useGetUserProfilesQuery();
  const userProfile = userProfiles?.find((profile) => profile?.userId === googleId)
  const id = userProfile?._id;
  const {data: orders} = useGetUserOrderQuery(id);
  
  return (
    <div>
        <Table orders={orders}/>
    </div>
  )
}

export default UserOrders;