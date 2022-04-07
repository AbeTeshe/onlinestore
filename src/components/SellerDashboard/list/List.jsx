import "./list.css";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { deleteProducts, getProduct } from "../../../redux/apiCalls/product";
import { deleteUsersProfile, getUsersProfiles } from "../../../redux/apiCalls/userProfile";

const List = ({name,  columns, setPage, setUserEditId, setProductEditId}) => {
  const [row, setRow] = useState(null);
  const products = useSelector((state) => state?.product?.products);
  const userProfile = useSelector((state) => state?.userProfile?.userProfile);
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
  }, [dispatch]);

  

  const handleDelete = (id) => {
    if(name==="Product"){
      deleteProducts(id, dispatch);
    }
    else if (name==="User"){
      deleteUsersProfile(id, dispatch);
    }
  };
  
  const handleEdit = (id) => {
    if(name==="Product") {
      setPage("newProduct");
      setProductEditId(id);
    }
    else if (name==="User"){
      setPage("newUser");
      setUserEditId(id);
    }
    else {

    }
  }

  const handleNew = () => {
    if(name==="Product"){
      setPage("newProduct");
    }
    else if (name==="User"){
      setPage("newUser");
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div 
               className="viewButton"
               onClick={() => handleEdit(params.row._id)}
            > 
               Edit {name}</div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              {name==="User" ? 'Disable': 'Delete'}
            </div>
          </div>
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
        rowsPerPageOptions={[15]}
        checkboxSelection
      />
    </div>
  );
};

export default List;