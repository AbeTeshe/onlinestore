import {  Button, Container, Grid, TextField } from '@material-ui/core';
import React, {useState} from 'react';
import Input from '../auth/Input';
import useStyles from './styles';
import profilePhoto from '../../assets/profile.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { createUserProfile } from '../../core/userProfileSlice';

const UserProfile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();

  const {givenName, familyName, imageUrl, email} = user?.result;

  const [person, setPerson] = useState({
      id: null,
      profileImg: imageUrl,
      firstName: familyName,
      lastName: givenName,
      Pemail: email,
      phoneNumber: '',
      country: '',
      city: '',
  });
  
  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createUserProfile(person));
  }

  const handleChange = (e) => {
      setPerson((prev) =>{
          return {...prev, id: Math.floor(Math.random() * 10000) + 1, [e.target.name]: e.target.value};
      });
  };

  console.log(person);
  return (
    <Container className={classes.profileContainer} component="main">
        <div className={classes.toolbar} />
            <Grid container justify = "center" spacing={3}>
                <Grid item  xs={12} sm={4} md={3} lg={3} className={classes.buttonsContainer}>
                    <Button  color="primary" variant="contained" className={classes.profileButtons}>Profile</Button>
                    <Button color="primary" variant="outlined" className={classes.profileButtons}>Change Password</Button>
                    <Button color="primary" variant="outlined" className={classes.profileButtons}>My Orders</Button>
                    <Button color="primary" variant="outlined" className={classes.profileButtons}>My Invoices</Button>
                </Grid>
                <Grid item  xs={12} sm={8} md={9} lg={9} style={{display: 'flex'}}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Input value={person.firstName} name="firstName" label="First Name" handleChange={handleChange} autoFocus />
                            <Input value={person.lastName} name="lastName" label="Last Name" handleChange={handleChange} autoFocus  />
                            <Input value={person.Pemail} name="Pemail" label="Email" handleChange={handleChange} autoFocus  />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Input value={person.phoneNumber} name="phoneNumber" label="Phone Number" handleChange={handleChange} autoFocus  />
                            <Input value={person.country} name="country" label="Country" handleChange={handleChange} autoFocus  />
                            <Input value={person.city} name="city" label="City" handleChange={handleChange} autoFocus  />
                        </Grid>
                        <Button color="primary" variant="contained" onClick={handleSubmit}>Update Profile</Button>
                    </Grid>
                </Grid>
            </Grid>
    </Container>
  )
}

export default UserProfile;