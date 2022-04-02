import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../../../redux/reducers/cartSlice';


import useStyles from './styles';

const Product = ({ product ,index }) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    
    // const IPFS = true;
    // const ipfsURL =  useSelector(state => state?.main?.products[index]?.ipfsURL);
    // const price = useSelector(state => state?.main?.products[index]?.price);
    // const name = useSelector(state => state?.main?.products[index]?.name);

    const {id, name, mediaUrl, price, description} = product;

    const onAddToCart = () => {
        dispatch(
            addItemToCart({
                id : id,
                name: name,
                price: Number(price),
                image: mediaUrl,
        })
      )
    }

    return (
     <Card className={classes.root}>
         {/* { IPFS ?  <CardMedia className={classes.media} image = {ipfsURL} title={product.name} /> :} */}
            <CardMedia className={classes.media} image={mediaUrl} title={product.name} />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="h5">
                    ${price}
                </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: description}} variant="body2" color="textSecondary" />
                
        </CardContent>
        
        <CardActions disableSpacing className={classes.cardActions}>
        <Link to={`/product/${product._id}`} style={{textDecoration: 'none'}}><Button className={classes.detailButton}>See Details</Button></Link>
            <IconButton aria-label="Add to Cart" onClick={onAddToCart}>
                <AddShoppingCart />
            </IconButton>
        </CardActions>
     </Card>
    );
}

export default Product;


