import "./newProduct.css";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {updateProducts, addProducts} from "../../../../redux/apiCalls/product";
const NewProduct = ({ productEditId, setProductEditId, setPage}) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
    supplier: ''
});
  
  const productToUpdate = useSelector((state) =>
    productEditId ? state.product.products.find((product) => product._id ===productEditId) : null);

console.log(productEditId);
   const dispatch = useDispatch();

    useEffect(() => {
      if(productToUpdate) setProductEditId(productToUpdate)
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
  setProduct({name: '', price: '', description: '', quantity: '', supplier: ''});
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
              <button onClick={handleSubmit}>{(productEditId === 0) ? 'Add' : 'Update'}</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;