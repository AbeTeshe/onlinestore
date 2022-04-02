import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";
import { addUsersProfile, getUsersProfile, updateUsersProfile } from "../../redux/apiCalls/userProfile";

const AddressForm = ({ checkoutToken, next }) => {
  
  
  const userProfile = useSelector((state) => state.userProfile.userProfile);
  const dispatch = useDispatch();

  const [shippingData, setShippingData] = useState({
    firstName: userProfile[0]?.firstName,
    lastName: userProfile[0]?.lastName,
    email: userProfile[0]?.email,
    country: userProfile[0]?.country,
    city: userProfile[0]?.city,
    addressLine1: userProfile[0]?.addressLine1,
    zipCode: userProfile[0]?.zipCode,
    shippingDivision: userProfile[0]?.shippingDivision,
    shippingOption: userProfile[0]?.shippingOption,
});

  const methods = useForm();

  useEffect(() => {
    getUsersProfile(dispatch);
  }, [dispatch]);

  
  const handleChange = (e) => {
    setShippingData((prev)=> {
      return {...prev, [e.target.name]:e.target.value};
    })
  }

  const handleSubmit =(e) => {
    e.preventDefault();
    if(userProfile.length===0){
      addUsersProfile(shippingData, dispatch);
    }
    else {
      updateUsersProfile(userProfile[0]?._id, shippingData, dispatch);
    }
  }

  const shippingCountry = shippingData.country;
  const shippingSubdivision = shippingData.shippingDivision;
  const shippingOption = shippingData.shippingOption;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
         onSubmit={methods.handleSubmit((data) =>
          next({
            ...data,
            shippingCountry,
            shippingSubdivision,
            shippingOption
          })
        )}>
          <Grid container spacing={3}>
            <FormInput value={shippingData.firstName} handleChange={handleChange} required name="firstName" label="First Name" />
            <FormInput value={shippingData.lastName} handleChange={handleChange} required name="lastName" label="Last Name" />
            <FormInput value={shippingData.addressLine1} handleChange={handleChange} required name="addressLine1" label="Address Line 1" />
            <FormInput value={shippingData.email} handleChange={handleChange} required name="email" label="Email" />
            <FormInput value={shippingData.city} handleChange={handleChange} required name="city" label="City" />
            <FormInput value={shippingData.zipCode} handleChange={handleChange} required name="zipCode" label="Zip / Postal code" />
            <FormInput value={shippingData.country}  handleChange={handleChange} name="country" label="Shipping Country" />
            <FormInput value={shippingData.shippingDivision} name="shippingDivision" label="Shipping subdivision" />
            <FormInput value={shippingData.shippingOption} name="shippingOption" label="Shipping options" />
          </Grid>
          <br />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to cart
            </Button>
            <Button type="submit" variant="contained" color="primary" >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
