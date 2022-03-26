import React, {useState, useEffect} from 'react'
import { Grid, Typography, Button } from '@material-ui/core';
import { Grade } from '@material-ui/icons';
import {Link, useParams} from "react-router-dom";
import { useDispatch } from 'react-redux';
import useStyles from "./styles";
import {addItemToCart} from '../../core/cartSlice';

const ProductDetails = ({products}) => {
    const {Pid} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [product] = products.filter((item) => item.id === Number(Pid));
    const {id, name, description, mediaUrl, price} = product;

    const onAddToCart = () => {
      dispatch(
          addItemToCart({
              id : id,
              name: name,
              price: price,
              image: mediaUrl,
      })
    )
  }

  return (
    <main className={classes.productDetailContainer}>
        <div className={classes.toolbar} />
        <Grid container justify="center" className={classes.detailProduct} spacing={3} >
            <Grid item  xs={12} sm={12} md={12} lg={12}>
               <Link to="/products" style={{textDecoration: 'none'}}><Button className={classes.backToProductsButton}>Back to Products</Button></Link>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <img src={mediaUrl} alt="detailprImage" className={classes.detailProductImage}/>
                <div className={classes.smallImages}>
                    <img src={mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={product.mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={product.mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={product.mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={product.mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="h1" className={classes.productDetailTitle}>{name}</Typography>
                <Typography className={classes.productRating}>
                {Array(5).fill().map((_, i) => (
                  <Grade className={classes.rating} key={i}/>
                ))} (100 customer reviews)
                </Typography>
                <Typography className={classes.productDetailPrice}>Price: <span className={classes.productPrice}>${price}</span></Typography>
                <Typography className={classes.productDetails}><span className={classes.productDetailName}>Available: </span> <span className={classes.productDesc}>In Stock</span></Typography>
                <Typography className={classes.productDetails}><span className={classes.productDetailName}>Product Code:</span> <span className={classes.productDesc}>100</span></Typography>
                <Typography className={classes.productDetailDescription}>{description}</Typography>
                <Button className={classes.AddToCartProduct} onClick={onAddToCart}>Add To Cart</Button>
            </Grid>
        </Grid>
    </main>
  )
}

export default ProductDetails