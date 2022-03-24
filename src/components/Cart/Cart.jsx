import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import {emptyCart} from "../../core/cartSlice";

const Cart = ({  handleUpdateCartQty, handleRemoveFromCart }) => {

    const classes = useStyles();
    const cartItems = useSelector(state=> state.cart.cartItems);
    const dispatch = useDispatch();


    let cartTotal = 0;

    for(let i=0; i< cartItems.length; i++){
        cartTotal = cartTotal + cartItems[i]?.totalPrice;
    }

    const handleEmptyCart = () => {
        dispatch(emptyCart());
    }

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart, 
        <Link to="/" className={classes.link}>
           start adding some
        </Link>!
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cartItems.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem cartTotal={cartTotal} item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cartTotal}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );

    // if(!cart.line_items) return "Loading..."


    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterbottom>
                Your Shopping Cart
            </Typography>
            { !cartItems.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}



export default Cart