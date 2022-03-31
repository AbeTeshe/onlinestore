import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import {emptyCart} from "../../core/cartSlice";

const Cart = ({  handleUpdateCartQty, handleRemoveFromCart }) => {

    const classes = useStyles();
    const user = useSelector((state) => state.auth.authData);
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
        <Grid className={classes.emptyCartContainer}>
            <Typography ariant="subtitle1" className={classes.subtitle}>You have no items in your shopping cart </Typography>
            <Link to="/" className={classes.link}>
            <Button className={classes.AddEmptyButton}>start adding some!</Button>
            </Link>
        </Grid>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={5}>
                {cartItems.map((item) => (
                    <Grid item xs={12} sm={12}  md={6} lg={6} key={item.id}>
                        <CartItem cartTotal={cartTotal} item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cartTotal}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    {user ? <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>:
                    <Button component={Link} to="/login" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Login</Button>}
                </div>
            </div>
        </>
    );

    // if(!cart.line_items) return "Loading..."


    return (
        <Container className={classes.cartContainer}>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterbottom>
                Your Shopping Cart
            </Typography>
            { !cartItems.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}



export default Cart;