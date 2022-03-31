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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const userProfile = useSelector((state) => state.userProfile.userProfile);
  console.log(userProfile[0].firstName);

  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name
    })
  );

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    // const { countries } = await commerce.services.localeListShippingCountries(
    //   checkoutTokenId
    // );

    // // [AL, BT, GB]
    // setShippingCountries(countries);
    // setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    // const { subdivisions } = await commerce.services.localeListSubdivisions(
    //   countryCode
    // );

    // setShippingSubdivisions(subdivisions);
    // setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const handleChange = () => {

  }

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    // const options = await commerce.checkout.getShippingOptions(
    //   checkoutTokenId,
    //   { country, region }
    // );

    // setShippingOptions(options);
    // setShippingOption(options[0].id);
  };

  // useEffect(() => {
  //   fetchShippingCountries(checkoutToken.id);
  // }, []);

  // useEffect(() => {
  //   if (shippingCountry) fetchSubdivisions(shippingCountry);
  // }, [shippingCountry]);

  // useEffect(() => {
  //   if (shippingSubdivision)
  //     fetchShippingOptions(
  //       checkoutToken.id,
  //       shippingCountry,
  //       shippingSubdivision
  //     );
  // }, [shippingSubdivision]);

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
          )}
        >
          <Grid container spacing={3}>
            <FormInput value={userProfile[0].firstName} handleChange={handleChange} required name="firstName" label="First Name" />
            <FormInput value={userProfile[0].lastName} handleChange={handleChange} required name="lastName" label="Last Name" />
            <FormInput value={userProfile[0].addressLine} handleChange={handleChange} required name="address1" label="Address Line 1" />
            <FormInput value={userProfile[0].email} handleChange={handleChange} required name="email" label="Email" />
            <FormInput value={userProfile[0].city} handleChange={handleChange} required name="city" label="City" />
            <FormInput value={userProfile[0].zipCode} handleChange={handleChange} required name="zip" label="Zip / Postal code" />
            <FormInput value={userProfile[0].country}  handleChange={handleChange} name="Country" label="Shipping Country" />
            <FormInput value={userProfile[0].shippingDivision} name="shippingDivision" label="Shipping subdivision" />
            <FormInput value={userProfile[0].shippingOption} name="options" label="Shipping options" />
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid> */}
          </Grid>
          <br />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
