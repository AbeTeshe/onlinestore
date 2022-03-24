import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../../../core/cartSlice';

const Product = ({ product ,index }) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();


    // const IPFS = true;
    // const ipfsURL =  useSelector(state => state?.main?.products[index]?.ipfsURL);
    // const price = useSelector(state => state?.main?.products[index]?.price);
    // const name = useSelector(state => state?.main?.products[index]?.name);

    const {id, name, mediaUrl, price, quantity} = product;

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
     <Card className={classes.root}>
         {/* { IPFS ?  <CardMedia className={classes.media} image = {ipfsURL} title={product.name} /> :} */}
            <CardMedia className={classes.media} image={product.mediaUrl} title={product.name} />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="h5">
                    ${product.price}
                </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color="textSecondary" />
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="Add to Cart" onClick={onAddToCart}>
                <AddShoppingCart />
            </IconButton>
        </CardActions>
     </Card>
    );
}

export default Product;


