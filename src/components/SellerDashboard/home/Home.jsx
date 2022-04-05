import {useState, useEffect} from 'react';
import Sidebar from "../sidebar/Sidebar";
import "./home.css";
import Widget from "../widget/Widget";
import Table from "../table/Table";
import List from "../list/List";
import NewProduct from "../new/product/NewProduct";
import NewUser from "../new/user/NewUser";
import {useSelector, useDispatch} from "react-redux";
import { getProduct } from '../../../redux/apiCalls/product';
import { getOrder } from '../../../redux/apiCalls/orderApiCalls';
import {getUsersProfiles} from '../../../redux/apiCalls/userProfile';
import {userColumns, productColumns} from '../datatablesource';
import { userInputs, productInputs } from '../formSource';

const Home = () => {
  const [page, setPage] = useState("home");
  const [userEditId, setUserEditId] = useState(null);
  const [productEditId, setProductEditId] = useState(null);
  const products = useSelector((state) => state?.product?.products);
  const orders = useSelector((state) => state?.order?.orders);
  const userProfile = useSelector((state) => state?.userProfile?.userProfile);


  const dispatch = useDispatch();
  
  
  useEffect(() => {
    getProduct(dispatch);
    getOrder(dispatch);
    getUsersProfiles(dispatch);
  }, [dispatch]);


  let orderTotal = 0;
  for(let i =0; i < orders.length; i++){
    orderTotal = orders[i].totalPrice + orderTotal;
  }

  return (
    <div className="home">
      <Sidebar setPage={setPage}/>
      <div className="homeContainer">
        {page === 'home' && <>
            <div className="widgets">
              <Widget type="user" setPage={setPage} size={userProfile.length}/>
              <Widget type="order" setPage={setPage} size={orders.length}/>
              <Widget type="totalSales" setPage={setPage} size={orderTotal}/>
            </div>
            <div className="listContainer">
              <div className="listTitle">Latest Transactions</div>
              <Table />
            </div>
          </>}
          {page==="userList" && 
            <List data={userProfile} 
              columns={userColumns} 
              name="User" 
              setPage={setPage}
              setUserEditId={setUserEditId}
              />}
          {page ==="productList" && 
            <List data={products} 
                  columns={productColumns} 
                  name="Product" 
                  setPage={setPage}
                  setProductEditId={setProductEditId}
                  /> }
          {page==="orders" && <Table />}
          {page==="newUser" &&
            <NewUser 
                 userEditId={userEditId}
                 setPage={setPage}
                 setUserEditId={setUserEditId}
             />}
          {page==="newProduct" && 
          <NewProduct 
              productEditId={productEditId}
              setProductEditId={setProductEditId}
              setPage={setPage}
          />}
      </div>
    </div>
  );
};


export default Home;