import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../auth/Input";
import HOC from "../HOC";

import { useAddUserProfileMutation, useUpdateUserProfileMutation} from "../../redux/services/apiSlice";
const AddressForm = ({user, userProfile, id, handleAppPage, next }) => {
 
  const [addUserProfile] = useAddUserProfileMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const {googleId, givenName, familyName,  email} = user?.result;
 
  const [shippingData, setShippingData] = useState({
    firstName: userProfile?.firstName || givenName,
    lastName: userProfile?.lastName || familyName,
    email: userProfile?.email || email,
    country: userProfile?.country,
    city: userProfile?.city,
    addressLine1: userProfile?.addressLine1,
    zipCode: userProfile?.zipCode,
    shippingDivision: userProfile?.shippingDivision,
    shippingOption: userProfile?.shippingOption,
});

  const methods = useForm();
  
  const handleChange = (e) => {
    setShippingData((prev)=> {
      return {...prev, [e.target.name]:e.target.value};
    })
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(userProfile===undefined){
      await addUserProfile({userId: googleId, ...shippingData});
    }
    else {
      updateUserProfile({id, ...shippingData});
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
            <Input value={shippingData.firstName} handleChange={handleChange} required name="firstName" label="First Name"  half/>
            <Input value={shippingData.lastName} handleChange={handleChange} required name="lastName" label="Last Name"  half/>
            <Input value={shippingData.addressLine1} handleChange={handleChange} required name="addressLine1" label="Address Line 1"  half/>
            <Input value={shippingData.email} handleChange={handleChange} required name="email" label="Email"  half/>
            <Input value={shippingData.city} handleChange={handleChange} required name="city" label="City"  half/>
            <Input value={shippingData.zipCode} handleChange={handleChange} required name="zipCode" label="Zip / Postal code"  half/>
            <Input value={shippingData.country}  handleChange={handleChange} name="country" label="Shipping Country"  half/>
            <Input value={shippingData.shippingDivision} handleChange={handleChange} name="shippingDivision" label="Shipping subdivision"   half/>
            <Input value={shippingData.shippingOption} handleChange={handleChange} name="shippingOption" label="Shipping options" half/>
          </Grid>
          <br />
          <Grid container style={{ display: "flex", justifyContent: "space-between" }} >
            <Button  variant="outlined" onClick={() => handleAppPage("cart")}>
              Back to cart
            </Button>
            <Button type="submit" variant="contained" color="primary" onClick={(userProfile===undefined) && handleSubmit}>
              {(userProfile===undefined) ? 'Add Shipping Info': 'Next'}
            </Button>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default HOC(AddressForm);
