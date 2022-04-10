export const productColumns = [
   
    {
      field: "product",
      headerName: "Product",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.mediaUrl} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 230,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      width: 230,
    },
  
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
  ];

  export const userColumns = [
    
    {
      field: "fullName",
      headerName: "fullName",
      width: 230,
      renderCell: (params) => {
        return (
            <p>{`${params.row.firstName} ${params.row.lastName}`}</p>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
    },
  ];

  export const orderColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "fullName",
      headerName: "fullName",
      width: 230,
      renderCell: (params) => {
        return (
            <p>{`${params.row.firstName} ${params.row.lastName}`}</p>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
    },
  ];
  
