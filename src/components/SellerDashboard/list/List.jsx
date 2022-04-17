import "./list.css";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import React, { useState, useEffect } from "react";
import { setProductEditId } from "../../../redux/reducers/productSlice";
import { setUserEditId } from "../../../redux/reducers/userProfileSlice";
import { setPage } from "../../../redux/reducers/stateSlices";
import {useGetProductsQuery, useGetUserProfilesQuery, 
  useUpdateProductMutation, useUpdateUserProfileMutation} from '../../../redux/services/apiSlice';

const List = ({name,  columns}) => {
  const [row, setRow] = useState(null);
  const page = useSelector((state) => state.states.page);
  const busStatus = useSelector(state=>state.product.status)
  // const products = useSelector((state) => state.product.products);
  // const userProfile = useSelector((state) => state.userProfile.userProfile);

  const {data:products, error, isLoading} = useGetProductsQuery();
  const {data: userProfile} = useGetUserProfilesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  
  const dispatch = useDispatch();


  useEffect(() => {
    if(name==="Product"){
      setRow(products);
    }
    if(name==="User"){
      setRow(userProfile);
    }
  }, [name]);

  console.log("List component");

  const handleDisable = (id) => {
    if(name==="Product"){
      updateProduct({id, ...products, isActive: false});
    }
    else if (name==="User"){
      updateUserProfile({id, ...userProfile, isActive: false});
    }
  };
  const handleEnable = (id) => {
    if(name==="Product"){
      updateProduct({id, ...products, isActive: true});
    }
    else if (name==="User"){
      updateUserProfile({id, ...userProfile, isActive: true});
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
      field: "edit",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
             <div 
               className="editButton"
               onClick={() => handleEdit(params.row._id)}
            > 
               Edit {name}</div>
        );
      },
    },
    {
      field: "disable",
      headerName: "",
      width: 120,
      renderCell: (params) => {
        return (<>
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
            </div>}</>
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
};

export default List;