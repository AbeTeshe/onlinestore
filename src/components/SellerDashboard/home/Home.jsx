import "./home.css";
import {Sidebar, Widget, List, NewProduct, NewUser, Card, Logo, LicensePage} from "../../index";
import {useSelector} from "react-redux";
import {userColumns, productColumns, orderColumns, invoiceColumns} from '../datatablesource';
import {useGetProductsQuery, useGetUserProfilesQuery, useGetOrdersQuery, useGetInvoicesQuery} from '../../../redux/services/apiSlice';

const Home = () => {
  const page = useSelector((state) => state.states.page);
  const {data:products} = useGetProductsQuery();
  const {data: userProfile} = useGetUserProfilesQuery();
  const {data: orders} = useGetOrdersQuery();
  const {data: invoices} = useGetInvoicesQuery();
  
 
  let orderTotal = 0;
  for(let i =0; i < invoices?.length; i++){
    orderTotal = invoices[i]?.totalPrice + orderTotal;
  }

  const subOrder = orders?.slice(0,9);

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
            <Card style={{flexDirection: 'column'}}>
              <div className="listTitle">Latest Transactions</div>
              <List row={subOrder || []}  columns={orderColumns} name="Invoice"/>
            </Card>
          </>}
          {page==="userList" && 
            <List  row={userProfile}  columns={userColumns} name="User" />}
          {page ==="productList" && 
            <List row={products} columns={productColumns} name="Product" /> }
          {page==="orders" && 
            <List row={orders}  columns={orderColumns} name="Order"/>}
          {page==="invoices" && 
          <List row={invoices}  columns={invoiceColumns} name="Invoice" />}
          {page==="newUser" && <NewUser />}
          {page==="newProduct" && <NewProduct />}
          {page==="logo" && <Logo />}
          {page==="profile" && <LicensePage />}
      </div>
    </div>
  );
};


export default Home;