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
  width: 600,
  backgroundColor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 2,
  p: 4,
};

const List = ({orders}) => {
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

  const getTime = (date) => {
    return moment.utc(date).format("DD MMM, YYYY");
  }
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            return <TableRow key={order._id}>
              <TableCell className="tableCell">{order._id}</TableCell>
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
                        {order.orderItems.map((item) => (
                          <div>
                            <img src={item.image} alt="tableImg" className="tableImage"/>
                            <h3>{item.name}</h3>
                            
                          </div>
                        ))}
                      </Box>
                    </Modal>
                </div>
              </TableCell> 
              <TableCell className="tableCell">{order.shippingAddress.fullName}</TableCell>
              <TableCell className="tableCell">{getTime(order.createdAt)}</TableCell>
              <TableCell className="tableCell">{order.totalPrice}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${order.status}`}>{order.orderStatus}</span>
              </TableCell>
              <TableCell className="tableCell">
              <Button
                  id="basic-button"
                  aria-controls={openMenu ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? 'true' : undefined}
                  onClick={handleClick}
                >
                  Select Action
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => handleStatus("Suspend")}>Suspend</MenuItem>
                  <MenuItem onClick={() => handleStatus("Refund")}>Refund</MenuItem>
                  <MenuItem onClick={() => handleStatus("Canceled")}>Cancel</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;