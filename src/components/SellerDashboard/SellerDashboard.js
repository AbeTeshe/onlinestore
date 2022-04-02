import React, {useState} from 'react';
import {  
    Typography, 
    AppBar, 
    Toolbar, 
    Button,
    Grid, 
    TextField, 
    Paper 
} from '@material-ui/core';
import useStyles from './styles';
import {create} from 'ipfs-http-client';
import {TrackProducts} from './TrackProducts';
import { useDispatch } from 'react-redux';
import {addNewProduct} from "../../redux/reducers/productSlice";

const client = create('https://ipfs.infura.io:5001');

const SellerDashboard = ({products}) => {

   
    const classes = useStyles();
    const [fileUrl, updateFileUrl] = useState(' ');
    async function onChange(e){
        const file = e.target.files[0];
        try{
          const added = await client.add(file);
          const url = `https://ipfs.infura.io/ipfs/${added.path}`;
          updateFileUrl(url);
          console.log(url);
        }catch(error){
          console.log("error uploading file: ",error);
        }
      }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('submit');
      }

    const handleAddNewProduct = e => {

        e.preventDefault();
        console.log("Add New Product");
    }
 const onFieldChange = (e) => {
   const value = e.target.value;
   const name = e.target.name;
    console.log(name, value);
  }
    return (
        <>
        <Paper>
            <form OnSubmit={handleSubmit}>
       <div className={classes.title}>
        <Typography  variant="h6" gutterBottom>
         List New Product
       </Typography>
     <Grid container spacing={2}>
         <Grid item xs={6}>
        
       <TextField
           name="name"
            label="Product Name"
            placeholder="Product Name"
            variant="outlined"
            onChange={e => onFieldChange(e)}
         /> 
         </Grid>
         <Grid item xs={6}>
         <TextField
           name="price"
            label="Product Price"
            placeholder="Product Price"
            variant="outlined"
            onChange={e => onFieldChange(e)}
         /> 
         </Grid>
         <Grid item xs={6}>
          <TextField
           name="description"
            label="Product Description"
            placeholder="Product Description"
            variant="outlined"
            onChange={e => onFieldChange(e)}
         /> 
         </Grid>
         {/* <Grid item xs={12}>
          <TextField
           name="mediaUrl"
            label="Product Media Url"
            placeholder="Product Media Url"
            variant="outlined"
         /> 
         </Grid> */}
         <Grid item xs={6}>
          <TextField
           name="quantity"
            label="Product Quantity"
            placeholder="Product Quantity"
            variant="outlined"
            onChange={e => onFieldChange(e)}
         /> 
         </Grid>
         <Grid item xs={12}>
         <input 
        type="file"
        onChange={onChange}
      />
      {/* {
        fileUrl && (
        <img src={fileUrl} width="600px" />
        )
      } */}
         </Grid>
         <Grid item xs={12}>
         <Button 
         variant="contained" 
         color="primary"
         onClick={handleAddNewProduct}
         >
             Add
         </Button>
         </Grid>
      </Grid>
      
      </div>
      </form>
      </Paper>
        <TrackProducts/>
    </>
    )
}

export default SellerDashboard;