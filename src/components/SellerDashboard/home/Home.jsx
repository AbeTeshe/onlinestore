import React,{useState, useEffect} from 'react';
import Sidebar from "../sidebar/Sidebar";
import "./home.css";
import Widget from "../widget/Widget";
import Table from "../table/Table";
import List from "../list/List";
import NewProduct from "../new/product/NewProduct";
import NewUser from "../new/user/NewUser";
import {useSelector} from "react-redux";
import {userColumns, productColumns, orderColumns, invoiceColumns} from '../datatablesource';
import {useGetProductsQuery, useGetUserProfilesQuery, useGetOrdersQuery, useGetInvoicesQuery} from '../../../redux/services/apiSlice';
import { DeliveryDining } from '@mui/icons-material';

const Home = () => {
  const page = useSelector((state) => state.states.page);
  // const orders = useSelector((state) => state?.order?.orders);
  // const products = useSelector((state) => state?.product?.products);
  // const userProfile = useSelector((state) => state?.userProfile?.userProfile);

  const {data:products, error, isLoading} = useGetProductsQuery();
  const {data: userProfile} = useGetUserProfilesQuery();
  const {data: orders} = useGetOrdersQuery();
  const {data: invoices} = useGetInvoicesQuery();

  const deliveredOrders = orders?.filter((order) => order.orderStatus==="Delivered");

  console.log(deliveredOrders);


 
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   getProduct(dispatch);
  //   getOrder(dispatch);
  //   getUsersProfiles(dispatch);
  // }, []);
 


  let orderTotal = 0;
  for(let i =0; i < orders?.length; i++){
    orderTotal = orders[i]?.totalPrice + orderTotal;
  }

  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
        {page === 'home' && <>
            <div className="widgets">
              <Widget type="user"  size={userProfile?.length}/>
              <Widget type="order"  size={orders?.length}/>
              <Widget type="totalSales"  size={orderTotal}/>
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Transactions</div>
              <Table orders={orders}/>
            </div>
          </>}
          {page==="userList" && 
            <List  
              columns={userColumns} 
              name="User" 
              rows={userProfile}
              />}
          {page ==="productList" && 
            <List 
                  columns={productColumns} 
                  name="Product" 
                  rows={products}
                  /> }
          {page==="orders" && 
          <List rows={orders}
                columns={orderColumns}
                name="Order"
          />}
          {page==="invoices" && 
          <List rows={deliveredOrders}
                columns={invoiceColumns}
                name="Invoice"
          />}
          
          {page==="newUser" &&
            <NewUser />}
          {page==="newProduct" && 
          <NewProduct />}
      </div>
    </div>
  );
};


export default Home;