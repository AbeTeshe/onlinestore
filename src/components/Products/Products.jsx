import React, {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {publicRequest} from "../../requestMethod";
import Product from './Product/Product';
import useStyles from './styles';
import { getProduct } from '../../redux/apiCalls/product';

const Products = ({searchField}) => {
    const classes = useStyles();
    //const [products, setProducts] = useState([]);
    const products =  useSelector(state => state?.product?.products);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getProduct(dispatch);
        // const getProducts = async() => {
        //   try {
        //     const res = await publicRequest.get("/products");
        //     setProducts(res.data);
        //     console.log(res.data);
        //   } catch (error) {
        //     console.log(error.message);
        //   }
        // }
        // getProducts();
            // const filteredProduct = products?.filter((product) => product.name?.toLowerCase().includes(searchField.toLowerCase()));
            // setFilteredProducts(filteredProduct ? filteredProduct: products);

      }, [dispatch]);


    // useEffect(() => {
    //     
    // }, [searchField]);

    return (
        <main className={classes.productsContainer}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products?.map((product,index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product}  />
                    </Grid>
                ))}
            </Grid>
        </main>
    );

}
// const Products = ({ products, onAddToCart }) => {
//     const classes = useStyles();
//     const data =  useSelector(state => state?.main?.products);
//     console.log("productsList-->", data);
//     return (
//         <main className={classes.content}>
//             <div className={classes.toolbar} />
//             <Grid container justify="center" spacing={4}>
//                 {data.map((product,index) => (
//                     <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//                         <Product product={product} index={index} onAddToCart={onAddToCart} />
//                     </Grid>
//                 ))}
//             </Grid>
//         </main>
//     );

// }

export default Products;