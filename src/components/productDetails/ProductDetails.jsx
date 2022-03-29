import React, {useState, useEffect} from 'react'
import { Grid, Typography, Button } from '@material-ui/core';
import { Grade } from '@material-ui/icons';
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import useStyles from "./styles";
import {addItemToCart} from '../../core/cartSlice';
import {getProduct} from '../../core/mainSlice';


const ProductDetails = () => {
    const {Pid} = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector((state) => state?.main?.products);
    console.log(products);
    const product = products?.find((item) => item.id ===Number(Pid));

    const {id, name, description, mediaUrl, price, details} = product;
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
               <Link to="/" style={{textDecoration: 'none'}}><Button className={classes.backToProductsButton}>Back to Products</Button></Link>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <img src={mediaUrl} alt="detailprImage" className={classes.detailProductImage}/>
                <div className={classes.smallImages}>
                    <img src={mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={details?.image1} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={details?.image2} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={details?.image3} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={details?.image4} alt="detailprImage" className={classes.detailProductImg}/>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="h1" className={classes.productDetailTitle}>{name}</Typography>
                <Typography className={classes.productRating}>
                {Array(details?.rating).fill().map((_, i) => (
                  <Grade className={classes.rating} key={i}/>
                ))} ({details?.totalReviews} customer reviews)
                </Typography>
                <Typography className={classes.productDetailPrice}>Price: <span className={classes.productPrice}>${price}</span></Typography>
                <Typography className={classes.productDetails}><span className={classes.productDetailName}>Available: </span> <span className={classes.productDesc}>{details?.availablityStatus}</span></Typography>
                <Typography className={classes.productDetails}><span className={classes.productDetailName}>Product Code:</span> <span className={classes.productDesc}>{details?.productCode}</span></Typography>
                <Typography className={classes.productDetailDescription}>{description}</Typography>
                <Button className={classes.AddToCartProduct} onClick={onAddToCart}>Add To Cart</Button>
            </Grid>
        </Grid>
    </main>
  )
}

export default ProductDetails