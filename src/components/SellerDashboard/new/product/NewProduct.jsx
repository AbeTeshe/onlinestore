import "./newProduct.css";
import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import {useSelector, useDispatch} from "react-redux";
import {updateProducts, addProducts} from "../../../../redux/apiCalls/product";
const NewProduct = ({ productEditId, setProductEditId, setPage}) => {
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
  
  const productToUpdate = useSelector((state) =>
    productEditId ? state.product.products.find((product) => product._id ===productEditId) : null);

    console.log(productEditId);

   const dispatch = useDispatch();

    useEffect(() => {
      if(productToUpdate) setProduct(productToUpdate)
    }, [productToUpdate]);

    const handleChange =(e) => {
      setProduct((prev ) =>{
        return {...prev, [e.target.name] : e.target.value}
      });
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(productEditId !== null ) {
      updateProducts(productEditId, product, dispatch);
    }
    else {
      addProducts(product, dispatch);
    }
    clear();
    setPage("productList");

  }


const clear = () => {
  setProduct({name: '', price: '', 
  description: '', quantity: '', 
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
  setProductEditId(null);
}

console.log(product);

  return (
    <div className="newUser">
      <div className="newContainer">
        <div className="top">
          <h1>{(productEditId === null) ? 'Add New Product' : 'Update Product'}</h1>
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
            </form>
        </div>
        <button onClick={handleSubmit} style={{margin: 'auto'}}>{(productEditId === null) ? 'Add' : 'Update'}</button>
      </div>
    </div>
  );
};

export default NewProduct;