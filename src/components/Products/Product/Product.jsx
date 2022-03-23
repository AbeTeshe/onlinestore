import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

import { useSelector } from 'react-redux';

const Product = ({ product ,index, onAddToCart }) => {
    const IPFS = true;
    const classes = useStyles();
    const ipfsURL =  useSelector(state => state?.main?.products[index]?.ipfsURL);
    const price = useSelector(state => state?.main?.products[index]?.price);
    const name = useSelector(state => state?.main?.products[index]?.name);
    return (
     <Card className={classes.root}>
         { IPFS ?  <CardMedia className={classes.media} image = {ipfsURL} title={product.name} /> :
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />}
        <CardContent>
            <div className={classes.cardContent}>

                <Typography variant="h5" gutterBottom>
                    {name}
                </Typography>

                <Typography variant="h5">
                    {price}
                </Typography>
                </div>

                <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color="textSecondary" />
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                <AddShoppingCart />
            </IconButton>
        </CardActions>
     </Card>
    );
}

export default Product


