import React, {useState} from 'react'
import "./userInvoice.css";
import moment from "moment";
import { Modal, Box, Button, Table, 
  TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper} from '@mui/material';
  
import {useGetUserInvoicesQuery} from "../../redux/services/apiSlice";

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 1,
    p: 4,
  };

const UserInvoices = ({id}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {data: invoices} = useGetUserInvoicesQuery(id);
  
    console.log(invoices);
    

  
  const getTime = (date) => {
    return moment.utc(date).format("DD MMM, YYYY");
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Invoice ID</TableCell>
            <TableCell className="tableCell">Invoice Details</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices?.map((invoice) => {
            return <TableRow key={invoice?._id}>
              <TableCell className="tableCell">{invoice?._id}</TableCell>
              <TableCell className="tableCell">
                <div style={{position: 'relative'}}>
                    <Button onClick={handleOpen}>See Invoice details</Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      BackdropProps={{
                        invisible: true,
                      }}
                    >
                      <Box sx={style}>
                        {invoice?.invoiceItems?.map((item) => (
                          <div className="orderProduct">
                            <div className="orderProductTitle">
                              <img src={item.image} alt="tableImg" className="tableImage"/>
                              <p>{item.name}</p>
                            </div>
                            <p>{item.quantity}</p>
                            <p>{`$${item.price * item.quantity}`}</p>
                          </div>
                        ))}
                      </Box>
                    </Modal>
                </div>
              </TableCell> 
              <TableCell className="tableCell">{invoice?.customerName}</TableCell>
              <TableCell className="tableCell">{getTime(invoice?.createdAt)}</TableCell>
              <TableCell className="tableCell">{invoice?.totalPrice}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserInvoices