import { Grid, Typography, Button } from '@material-ui/core';
import { Grade } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import Loading from "./Loading";
import useStyles from "./styles";
import {useGetProductQuery} from "../../redux/services/apiSlice";
import HOC from "../HOC";

const ProductDetails = ({onAddToCart, handleAppPage}) => {
    const id = useSelector((state) => state.states.productDetailId);
    const classes = useStyles();
    const {data:product, isLoading} = useGetProductQuery(id);
    

  return (
    <>
    {isLoading ? <Loading /> :
    <main className={classes.productDetailContainer}>
        <div className={classes.toolbar} />
        <Grid container justify="center" className={classes.detailProduct} spacing={3} >
            <Grid item  xs={12} sm={12} md={12} lg={12}>
               <Button className={classes.backToProductsButton} onClick={() =>handleAppPage("productPage")}>Back to Products</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <img src={product?.mediaUrl} alt="detailprImage" className={classes.detailProductImage}/>
                <div className={classes.smallImages}>
                    <img src={product?.mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={product?.details?.image1 || product?.mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={product?.details?.image2 || product?.mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={product?.details?.image3 || product?.mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                    <img src={product?.details?.image4 || product?.mediaUrl} alt="detailprImage" className={classes.detailProductImg}/>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="h2" className={classes.productDetailTitle}>{product?.name}</Typography>
                <Typography className={classes.productRating}>
                {Array(product?.details?.rating).fill().map((_, i) => (
                  <Grade className={classes.rating} key={i}/>
                ))} ({product?.details?.totalReviews} customer reviews)
                </Typography>
                <Typography className={classes.productDetailPrice}>Price: <span className={classes.productPrice}>{`$${product?.price}`}</span></Typography>
                <Typography className={classes.productDetails}><span className={classes.productDetailName}>Available: </span> <span className={classes.productDesc}>{product?.details?.availabilityStatus}</span></Typography>
                <Typography className={classes.productDetails}><span className={classes.productDetailName}>Product Code:</span> <span className={classes.productDesc}>{product?.details?.productCode}</span></Typography>
                <Typography className={classes.productDetailDescription}>{product?.description}</Typography>
                <Button className={classes.AddToCartProduct} onClick={() => onAddToCart(product)}>Add To Cart</Button>
            </Grid>
        </Grid>
    </main>}</>
  )
}

export default HOC(ProductDetails);