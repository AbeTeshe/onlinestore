import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Product from './Product/Product';
import useStyles from './styles';


const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();
    const data =  useSelector(state => state?.main?.products);
    return (
        <main className={classes.productsContainer}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product,index) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} index={index} onAddToCart={onAddToCart} />
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