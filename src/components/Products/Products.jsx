import React, {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';


const Products = ({searchField, products}) => {
    const classes = useStyles();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filteredProduct = products?.filter((product) => (product.name?.toLowerCase().includes(searchField.toLowerCase()) && product.isActive===true));
        setFilteredProducts(filteredProduct ? filteredProduct: products);
     }, [searchField, products]);

    return (
        <main className={classes.productsContainer}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {filteredProducts?.map((product,index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}
export default Products;