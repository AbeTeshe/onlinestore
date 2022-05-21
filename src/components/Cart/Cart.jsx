import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import {emptyCart} from "../../redux/reducers/cartSlice";
import { setAppPage, setLoginPlace } from '../../redux/reducers/stateSlices';

const Cart = ({  handleUpdateCartQty, handleRemoveFromCart, handleClose }) => {

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

    const handleAppPage = (page) => {
        dispatch(setAppPage(page))
    }

    const handleLogin = () => {
        handleClose();
        dispatch(setLoginPlace("cart"));
        dispatch(setAppPage("login"));
    }

    const EmptyCart = () => (
        <Grid className={classes.emptyCartContainer}>
            <Typography variant="subtitle1" className={classes.subtitle}>You have no items in your shopping cart </Typography>
            <Button className={classes.AddEmptyButton} onClick={()=> handleAppPage("productPage")}>start adding some!</Button>
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
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.cartButtons}>
                    <Button className={classes.continueShopping} onClick={()=> handleAppPage("productPage")}>Continue Shopping </Button>
                    <Button size="large" variant="contained" color="secondary" className={classes.emptyButton} onClick={handleEmptyCart}>Empty Cart</Button>
                </Grid>
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h2" className={classes.cartTotal}>Total: {`$${cartTotal}`}</Typography>
                {user ? <Button onClick={()=> handleAppPage("checkout")} className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Proceed to Checkout</Button>:
                <Button onClick={handleLogin}  className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Login</Button>}
            </div>
        </>
    );

    return (
        <Container className={classes.cartContainer}>
            <div className={classes.toolbar} />
            <Typography className={classes.cardTitle} variant="h3" gutterbottom>
                Your Shopping Cart
            </Typography>
            { !cartItems.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}


export default Cart;