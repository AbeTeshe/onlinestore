import "./list.css";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import React, { useState, useEffect } from "react";
import { updateProducts, getProduct } from "../../../redux/apiCalls/product";
import { updateUsersProfile, getUsersProfiles } from "../../../redux/apiCalls/userProfile";
import { setProductEditId } from "../../../redux/reducers/productSlice";
import { setUserEditId } from "../../../redux/reducers/userProfileSlice";
import { setPage } from "../../../redux/reducers/stateSlices";

const List = React.memo(({name,  columns}) => {
  const [row, setRow] = useState(null);
  const page = useSelector((state) => state.states.page);
  const products = useSelector((state) => state.product.products);
  const userProfile = useSelector((state) => state.userProfile.userProfile);
  const dispatch = useDispatch();


  useEffect(() => {
    getProduct(dispatch);
    getUsersProfiles(dispatch);
    if(name==="Product"){
      setRow(products);
    }
    if(name==="User"){
      setRow(userProfile);
    }
  }, [dispatch, userProfile, products]);

  console.log("rendering");

  

  const handleDisable = (id) => {
    if(name==="Product"){
      updateProducts(id, {...products, isActive: true}, dispatch);
    }
    else if (name==="User"){
      updateUsersProfile(id, {...userProfile, isActive: true}, dispatch);
    }
  };
  
  const handleEdit = (id) => {
    if(name==="Product") {
      dispatch(setPage("newProduct"))
      dispatch(setProductEditId(id));
    }
    else if (name==="User"){
      dispatch(setPage("newUser"));
      dispatch(setUserEditId(id));
    }
    else {
      
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

  const actionColumn = [
    {
      field: "disable",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
            <div
              className="deleteButton"
              onClick={() => handleDisable(params.row._id)}
            >
             {params.row.isActive ? 'Disable' : 'Disabled'}
            </div>
        );
      },
    },
    {
      field: "edit",
      headerName: "",
      width: 120,
      renderCell: (params) => {
        return (<>
            {params.row.isActive && <div 
               className="editButton"
               onClick={() => handleEdit(params.row._id)}
            > 
               Edit {name}</div>}
               </>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {name}
        <div  className="link" onClick={handleNew}>
          Add New
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={row}
        getRowId={(row) => row?._id}
        disableSelectionOnClick
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
});

export default List;