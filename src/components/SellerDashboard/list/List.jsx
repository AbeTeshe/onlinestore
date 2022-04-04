import "./list.css";
import { DataGrid } from "@mui/x-data-grid";


import { useState } from "react";

const List = ({name, data, columns, setPage}) => {
  const [row, setRow] = useState(data);

  const handleDelete = (id) => {
    setRow(row.filter((item) => item.id !== id));
  };
  
  const handleEdit = (id) => {

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
               onClick={handleEdit}
            > 
               Edit</div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
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
        <div to="/users/new" className="link" onClick={() => setPage("newUser")}>
          Add New
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={row}
        getRowId={(row) => row._id}
        columns={columns.concat(actionColumn)}
        rowsPerPageOptions={[15]}
        checkboxSelection
      />
    </div>
  );
};

export default List;