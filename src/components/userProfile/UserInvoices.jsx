
import "./userInvoice.css";
import {Card, List} from "../index";
import {useGetUserInvoicesQuery} from "../../redux/services/apiSlice";
import { invoiceColumns } from '../SellerDashboard/datatablesource';
import HOC from '../HOC';

const UserInvoices = ({id}) => {
  
  const {data: invoices} = useGetUserInvoicesQuery(id);
  return (
    <Card style={{flexDirection: 'column', width: '100%'}}>
      <List row={invoices || []} columns={invoiceColumns} name="Invoice" />
    </Card>
  )
}

export default HOC(UserInvoices);