import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import useStyles from './styles';
import {removeItemFromCart, updateCartQuantity} from "../../../core/cartSlice";

const CartItem = ({item}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const onRemoveFromCart = (id) => {
      dispatch(removeItemFromCart(id))
  }

  const onUpdateCartQty = ({id, quantity}) => {
      dispatch(updateCartQuantity({id, quantity}))
  }


  return (
        <Card>
            <CardMedia image={item.mediaUrl} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">${item.totalPrice}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty({id: item.id,  quantity: -1})}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty({id: item.id,  quantity: 1})}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;