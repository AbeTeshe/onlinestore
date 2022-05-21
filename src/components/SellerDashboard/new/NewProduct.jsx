import React,  { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {create} from 'ipfs-http-client';
import {resetProductEditId} from "../../../redux/reducers/editSlice";
import {Card, Form, Input, Button} from "../../index";

import { setPage } from "../../../redux/reducers/stateSlices";
import {useGetProductQuery, useAddProductMutation, useUpdateProductMutation} from "../../../redux/services/apiSlice";
import {toast} from 'react-toastify';

const client = create('https://ipfs.infura.io:5001');
const NewProduct = () => {
  const [product, setProduct] = useState({name: '', price: '', description: '',
                                    mediaUrl: '', quantity: '', supplier: '',
                                    details: {
                                      totalReviews: '',
                                      rating: '',
                                      availabilityStatus: '',
                                      productCode: '',
                                      productCategory: '',
                                      image1: '',
                                      image2: '',
                                      image3: '',
                                      image4: ''
                                    }
                                });

  const id = useSelector((state) => state.edit.productEditId);
  const {data} = useGetProductQuery(id);
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  

   const dispatch = useDispatch();
 
    useEffect(() => {
      if(data) setProduct(data)
    }, [id, data]);

    const handleChange =(e) => {
      setProduct((prev ) =>{
        return {...prev, [e.target.name] : e.target.value}
      });
    }

    const handleImage = async (e) => {
      const file = e.target.files[0];
      const res = await fetch('https://bafybeifxlksheu6fwwrsbix75sdodubptoyqfc45js3xcdpenq2cu7d3da.ipfs.infura-ipfs.io/');
      try {
        const added = await client.add(file);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`; 
        setProduct((prev) =>{
          return {...prev, mediaUrl: url};
        }) 
      } catch (error) {
        console.log(error);
      }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(id !== null ) {
      await updateProduct({id, ...product});
      toast.success("Product Updated!");
    }
    else {
      await addProduct(product);
      toast.success("New Product Added!");
    }
    clear();
    dispatch(setPage("productList"));

  }


const clear = () => {
  setProduct({name: '', price: '', 
  description: '', quantity: '', mediaUrl: '',
  supplier: '', details: {
      totalReviews: '',
      rating: '',
      availabilityStatus: '',
      productCode: '',
      productCategory: '',
      image1: '',
      image2: '',
      image3: '',
      image4: ''
  }});
  dispatch(resetProductEditId());
}

  return (
  
      <>
        <Card style={{justifyContent: 'center'}}>
          <h1 style={{color: 'lightgray', fontSize: '20px'}}>{(id === null) ? 'Add New Product' : 'Update Product'}</h1>
        </Card>
        <Card>
            <Form>
            <Input label="Name" type="text" name="name" value={product.name} handlechange={handleChange} />
            <Input label="Price" type="text" name="price" value={product.price} handlechange={handleChange} />
            <Input label="Description" type="text" name="description" value={product.description} handlechange={handleChange} />
            <Input label="Quantity" type="text" name="quantity" value={product.quantity} handlechange={handleChange} />
            <Input label="Supplier" type="text" name="supplier" value={product.supplier} handlechange={handleChange} />
            <Input label="Image" type="file" name="mediaUrl"  handlechange={handleImage} />
            <Input label="Image's URL" type="text" name="mediaUrl" value={product.mediaUrl} handlechange={handleImage} />
            </Form>
        </Card>
        <Button onClick={handleSubmit} >{(id === null) ? 'Add' : 'Update'}</Button>
      </>
   
  );
};
export default NewProduct;