import "./table.css";
import React, {useState} from "react";
import { useDispatch } from "react";
import { Modal, Box, Button, Table, Menu, 
  TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper,  MenuItem} from '@mui/material';
import {Delete} from "@mui/icons-material";
import moment from "moment";
import { updateOrder } from "../../../redux/apiCalls/orderApiCalls";

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

const List = ({orders, isAdmin}) => {
  const [order, setOrder] = useState({
    orderItems: [
      {
        name: "",
        quantity: "",
        image: "",
        price: ""
      }
    ],
    shippingAddress: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    orderStatus: "",
    totalPrice: "",
    userId: "",
  })
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const dispatch = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  const handleStatus =(status) => {
    updateOrder(id, {...orders, orderStatus: status}, dispatch);
    setAnchorEl(null);
  }

  const handleChange = (e) => {
    setOrder((prev) => {
      return {...prev, [e.target.name]:e.target.value}
  });
  console.log(order);
  }

  const getTime = (date) => {
    return moment.utc(date).format("DD MMM, YYYY");
  }
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order ID</TableCell>
            <TableCell className="tableCell">Order Details</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            {isAdmin && <TableCell className="tableCell">Action</TableCell>}
            {isAdmin && <TableCell className="tableCell">Deliver</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => {
            return <TableRow key={order?._id}>
              <TableCell className="tableCell">{order?._id}</TableCell>
              <TableCell className="tableCell">
                <div style={{position: 'relative'}}>
                    <Button onClick={handleOpen}>See Order details</Button>
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
                        {order?.orderItems?.map((item) => (
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
              <TableCell className="tableCell">{order?.shippingAddress?.fullName}</TableCell>
              <TableCell className="tableCell">{getTime(order?.createdAt)}</TableCell>
              <TableCell className="tableCell">{order?.totalPrice}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${order?.status}`}>{order?.orderStatus}</span>
              </TableCell>
              {isAdmin && <TableCell className="tableCell">
              <label htmlFor="order">Order</label>
              <select  name="orderStatus" value={order?.orderStatus} onChange={(e) => setOrder({...order, orderStatus: e.target.value})}>
                 <option>change Status</option>
                <option value="Suspend">Suspend</option>
                <option value="Refund">Refund</option>
                <option value="Cancel">Cancel</option>
              </select>
                </TableCell>}
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;