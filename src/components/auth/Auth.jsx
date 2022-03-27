import React, {useState} from 'react';
import {GoogleLogin} from 'react-google-login';
import {Container, Grid, Paper, Avatar, Button, TextField, Typography} from "@material-ui/core";
import { LockOutlined } from '@material-ui/icons';
import {Link, useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import Icon  from './Icon';
import Input from './Input';
import useStyles from "./styles";
import {login} from '../../core/authSlice';
const initialState = {firstName: '', 
                       lastName: '', email: '',
                       password: '', confirmPassword: ''};

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = () => setShowPassword(!showPassword); 
    const dispatch = useDispatch();
    const history= useHistory();
    
    
    const handleChange= (elements) => {

    }

    const handleSubmit = (e) => {

    }

    const switchMode = () => {
        setIsSignup((preIsSignup) => !preIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log(token);

        try {
            dispatch(login({token, result}));
            history.push('/');
        }
        catch(error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };

  return (
    <Container className={classes.authContainer} component="main" maxWidth="xs">
        <div className={classes.toolbar} />
        <Paper className={classes.paper} elevation={2}>
            <Avatar className={classes.avatar}>
                    <LockOutlined />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                   <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus  />
                                   <Input name="lastName" label="Last Name" handleChange={handleChange}   />
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                            {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
                            
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin clientId="1020193705109-r2f6e31mhi2aqqjqo2461vsfkm6nonol.apps.googleusercontent.com" 
                        render={(renderProps) => {
                            return (
                                <Button 
                                    className={classes.googleButton} 
                                    color="primary" 
                                    fullWidth 
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />} variant="contained">
                                        Google Sign In
                                </Button>
                            )
                        }}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifycontent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </Paper>
    </Container>
  )
}

export default Auth