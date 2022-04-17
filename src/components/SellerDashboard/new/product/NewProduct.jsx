import "./newProduct.css";
import React,  { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import {useSelector, useDispatch} from "react-redux";
import {updateProducts, addProducts} from "../../../../redux/apiCalls/product";
import {create} from 'ipfs-http-client';
import {resetProductEditId} from "../../../../redux/reducers/productSlice";
import { setPage } from "../../../../redux/reducers/stateSlices";
import {useGetProductQuery, useAddProductMutation, useUpdateProductMutation} from "../../../../redux/services/apiSlice";

const client = create('https://ipfs.infura.io:5001');
const NewProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    mediaUrl: '',
    quantity: '',
    supplier: '',
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
  const productEditId = useSelector((state) => state.product.productEditId);
  const {data} = useGetProductQuery(productEditId);
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  

   const dispatch = useDispatch();
   console.log(productEditId);

    useEffect(() => {
      if(data) setProduct(data)
    }, [productEditId, data]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(productEditId !== null ) {
      updateProduct({productEditId, ...product});
    }
    else {
      addProduct(product);
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
    <div className="newUser">
      <div className="newContainer">
        <div className="top">
          <h1 className="newTitle">{(productEditId === null) ? 'Add New Product' : 'Update Product'}</h1>
        </div>
        <div className="bottom">
            <form>
                <div className="formInput">
                  <label>Name</label>
                  <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="" />
                </div>
                <div className="formInput">
                  <label>Price</label>
                  <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="" />
                </div>
                <div className="formInput">
                  <label>Description</label>
                  <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="" />
                </div>
                <div className="formInput">
                  <label>Quantity</label>
                  <input type="text" name="quantity" value={product.quantity} onChange={handleChange} placeholder="" />
                </div>
                <div className="formInput">
                  <label>Supplier</label>
                  <input type="text" name="supplier" value={product.supplier} onChange={handleChange} placeholder="" />
                </div>
                
                <div className="formInput">
                  <label>Image</label>
                  <input type="file" name="mediaUrl" onChange={handleImage} placeholder="" />
                </div>
            </form>
        </div>
        <button onClick={handleSubmit} style={{margin: 'auto'}} className="newButton">{(productEditId === null) ? 'Add' : 'Update'}</button>
      </div>
    </div>
  );
};

export default NewProduct;