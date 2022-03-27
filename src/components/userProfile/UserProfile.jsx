import {  Button, Container, Grid, TextField } from '@material-ui/core';
import React, {useState} from 'react';
import Input from '../auth/Input';
import useStyles from './styles';
import profilePhoto from '../../assets/profile.jpg';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.authData);
  console.log(user?.result?.email);

  const {givenName, familyName, imageUrl, email} = user?.result;
  console.log(familyName, givenName, email);

  const [person, setPerson] = useState({
      profileImg: imageUrl,
      firstName: familyName,
      lastName: givenName,
      Pemail: email,
      phoneNumber: '',
      country: '',
      city: '',
  });
  

  const handleChange = () => {

  }
  return (
    <Container className={classes.profileContainer} component="main">
        <div className={classes.toolbar} />
            <Grid container justify = "center" spacing={3}>
                <Grid item  xs={12} sm={4} md={3} lg={3} className={classes.buttonsContainer}>
                    <Button  color="primary" variant="contained" className={classes.profileButtons}>Profile</Button>
                    <Button color="primary" variant="outlined" className={classes.profileButtons}>My Orders</Button>
                    <Button color="primary" variant="outlined" className={classes.profileButtons}>My Invoices</Button>
                </Grid>
                <Grid item  xs={12} sm={8} md={9} lg={9} style={{display: 'flex'}}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <div item>
                            <div className={classes.profileLabel}>
                                <img className={classes.profileImage} src={ profilePhoto} alt="" />
                            </div>
                            <input  type="file" multiple={false} 
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8} lg={8}>
                        <Input value={person.firstName} name="firstName" label="First Name" handleChange={handleChange} autoFocus  />
                        <Input value={person.lastName} name="lastName" label="Last Name" handleChange={handleChange} autoFocus  />
                        <Input value={person.Pemail} name="Pemail" label="Email" handleChange={handleChange} autoFocus  />
                        <Input value={person.phoneNumber} name="phoneNumber" label="Phone Number" handleChange={handleChange} autoFocus  />
                        <Input value={person.country} name="country" label="Country" handleChange={handleChange} autoFocus  />
                        <Input value={person.city} name="city" label="City" handleChange={handleChange} autoFocus  />
                        <Button color="primary" variant="contained">Update Profile</Button>
                    </Grid>
                </Grid>
            </Grid>
    </Container>
  )
}

export default UserProfile;