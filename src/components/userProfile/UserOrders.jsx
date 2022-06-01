import { useGetUserOrderQuery } from '../../redux/services/apiSlice';
import {Card, List} from "../index";
import { orderColumns } from '../SellerDashboard/datatablesource';
import HOC from '../HOC';

const UserOrders = ({id}) => {
  const {data: orders} = useGetUserOrderQuery(id);
  return (
    <Card style={{flexDirection: 'column', width: '100%'}}>
        <List  row={orders || []} columns={orderColumns} name="Invoice"/>
    </Card>
  )
}

export default HOC(UserOrders);