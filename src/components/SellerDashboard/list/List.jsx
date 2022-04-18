import "./list.css";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {Menu, Button,  MenuItem} from "@mui/material";
import React, { useState, useEffect } from "react";
import { setProductEditId } from "../../../redux/reducers/productSlice";
import { setUserEditId } from "../../../redux/reducers/userProfileSlice";
import { setPage } from "../../../redux/reducers/stateSlices";
import {useGetProductsQuery, useGetUserProfilesQuery, 
  useUpdateProductMutation, useUpdateUserProfileMutation, useGetOrdersQuery,
  useUpdateOrderMutation, useAddInvoiceMutation, useGetInvoicesQuery} from '../../../redux/services/apiSlice';

const List = ({name,  columns}) => {
  const [row, setRow] = useState(null);
  const page = useSelector((state) => state.states.page);
  

  const {data:products} = useGetProductsQuery();
  const {data: userProfile} = useGetUserProfilesQuery();
  const {data: orders} = useGetOrdersQuery();
  const {data: invoices} = useGetInvoicesQuery();

  const [updateProduct] = useUpdateProductMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [addInvoice] = useAddInvoiceMutation();


  const deliveredOrders = orders?.filter((order) => order.orderStatus==="Delivered");

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const dispatch = useDispatch();


  useEffect(() => {
    if(name==="Product"){
      setRow(products);
    }
    if(name==="User"){
      setRow(userProfile);
    }
    if(name==="Order") {
      setRow(orders);
    }
    if(name==="Invoice"){
      setRow(invoices);
    }
  }, [name]);

  console.log("List component");

  const handleDisable = async (id) => {
    if(name==="Product"){
      await updateProduct({id, ...products, isActive: false});
    }
    else if (name==="User"){
      await updateUserProfile({id, ...userProfile, isActive: false});
    }
  };
  const handleEnable = async (id) => {
    if(name==="Product"){
      await updateProduct({id, ...products, isActive: true});
    }
    else if (name==="User"){
      await updateUserProfile({id, ...userProfile, isActive: true});
    }
  };

  const handleDeliver = async (id) => {
    await updateOrder({id, ...orders, orderStatus: 'Delivered'});
    const deliveredOrder = orders.find((order) => order._id === id);
    await addInvoice({
      invoiceItems: deliveredOrder.orderItems,
      customerName: deliveredOrder.shippingAddress.fullName,
      totalPrice: deliveredOrder.totalPrice,
      userId: deliveredOrder.userId
    });
  }
  
  const handleEdit = (id) => {
    if(name==="Product") {
      dispatch(setPage("newProduct"))
      dispatch(setProductEditId(id));
    }
    else if (name==="User"){
      dispatch(setPage("newUser"));
      dispatch(setUserEditId(id));
    }
  }

  const handleNew = () => {
    if(name==="Product"){
      dispatch(setPage("newProduct"));
    }
    else if (name==="User"){
      dispatch(setPage("newUser"));
    }
  }

  const handleStatus = async (id, status) => {
    await  updateOrder({id, ...orders, orderStatus: status});
  }

  const actionColumn = [
    {
      field: "edit",
      headerName: "Action",
      width:  120,
      renderCell: (params) => {
        return (
             <>
               {name==="Order" ? <>{params.row.orderStatus !== "Delivered" && <Button onClick={() => handleDeliver(params.row._id)} variant="contained">Deliver</Button>}</>
                : 
                <div 
               className="editButton"
               onClick={() => handleEdit(params.row._id)}
            > 
               Edit {name}</div>
               }
             </>
        );
      },
    },
    {
      field: "disable",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {name==="Order" ? 
            <>
            {(params.row.orderStatus !=="Delivered" && params.row.orderStatus !=="Shipped") && <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Change Status
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleStatus(params.row._id, "Shipped")}>Ship</MenuItem>
              <MenuItem onClick={() => handleStatus(params.row._id, "Suspended")}>Suspend</MenuItem>
              <MenuItem onClick={() => handleStatus(params.row._id, "Refunded")}>Refund</MenuItem>
              <MenuItem onClick={() => handleStatus(params.row._id, "Canceled")}>Cancel</MenuItem>
            </Menu>
         </div>}
            </>
            :
            <>
            {params.row.isActive ? 
              <div
              className="disableButton"
              onClick={() => handleDisable(params.row._id)}
            >
             Disable
            </div>:
            <div
              className="enableButton"
              onClick={() => handleEnable(params.row._id)}
            >
            Enable
            </div>}</>}
          </div>
        );
      },
    },
    
  ];
  return (
    <div className="datatable">
      {(name !=="Order" && name !=="Invoice") && <div className="datatableTitle">
        Add New {name}
        <div  className="link" onClick={handleNew}>
          Add New
        </div>
      </div>}
      <DataGrid
        className="datagrid"
        rows={row}
        getRowId={(row) => row?._id}
        disableSelectionOnClick
        columns={name ==="Invoice" ? columns : columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default List;