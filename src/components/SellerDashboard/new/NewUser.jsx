import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { resetProfileEditId } from "../../../redux/reducers/editSlice";
import { setPage } from "../../../redux/reducers/stateSlices";
import {Card, Form, Input, Button} from "../../index";
import {useGetUserProfileQuery, useAddUserProfileMutation, useUpdateUserProfileMutation } from "../../../redux/services/apiSlice";
import {toast} from "react-toastify";

const NewUser = () => {
  const [person, setPerson] = useState({firstName: '', lastName: '', email: '',
                                phoneNumber: '', country: '', city: '',  addressLine1: '',
                                zipCode: '', shippingDivision: '', shippingOption: '' });

  const id = useSelector((state) => state.edit.profileEditId)
  
  const {data} = useGetUserProfileQuery(id);
  const [addUserProfile] = useAddUserProfileMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if(data) setPerson(data)
  }, [id, data]);

  const handleChange =(e) => {
    setPerson((prev ) =>{
      return {...prev, [e.target.name] : e.target.value}
    });
  }

  const handleSubmit =async  (e) => {
    e.preventDefault();
    if(id !== null ) {
      await updateUserProfile({id, ...person});
      toast.success("User updated!");
    }
    else {
      await addUserProfile(person);
      toast.success("New User Added!");
    }
    clear();
    dispatch(setPage("userList"));
  }

  const clear = () => {
    setPerson({firstName: '', lastName: '', email: '', phoneNumber: '', 
        country: '', city: '', addressLine1: '', zipCode: '', 
        shippingDivision: '', shippingOption: ''});
    dispatch(resetProfileEditId());
  }

  return (
      <>
        <Card style={{justifyContent: 'center'}}>
          <h1 style={{color: 'lightgray', fontSize: '20px'}}>{(id === null) ? 'Add New user' : 'Update User'}</h1>
        </Card>
        <Card>
            <Form>
              <Input label="First Name" type="text" name="firstName" value={person.firstName} handlechange={handleChange} />
              <Input label="Last Name" type="text" name="lastName" value={person.lastName} handlechange={handleChange} />
              <Input label="Email" type="text" name="email" value={person.email} handlechange={handleChange} />
              <Input label="Phone Number" type="text" name="phoneNumber" value={person.phoneNumber} handlechange={handleChange} />
              <Input label="Country" type="text" name="country" value={person.country} handlechange={handleChange} />
              <Input label="City" type="text" name="city" value={person.city} handlechange={handleChange} />
              <Input label="Address line 1" type="text" name="addressLine1" value={person.addressLine1} handlechange={handleChange} />
              <Input label="Zip Code" type="text" name="zipCode" value={person.zipCode} handlechange={handleChange} />
              <Input label="Shipping Division" type="text" name="shippingDivision" value={person.shippingDivision} handlechange={handleChange} />
              <Input label="Shipping Option" type="text" name="shippingOption" value={person.shippingOption} handlechange={handleChange} />
            </Form>
        </Card>
        <Button onClick={handleSubmit} >{(id === null) ? 'Add' : 'Update'}</Button>
      </>
  );
};

export default NewUser;