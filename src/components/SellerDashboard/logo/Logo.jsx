import React, {useState, useEffect} from 'react'
import {create} from 'ipfs-http-client';
import {useUpdateLogoMutation, useGetLogoDataQuery, useAddLogoDataMutation} from "../../../redux/services/apiSlice";
import { toast } from 'react-toastify';
import {Card, Form, Input, Button} from "../../index";

const client = create('https://ipfs.infura.io:5001');

const Logo = () => {
    
  const [logoData, setLogoData] = useState({
    logoText: "",
    logoImage: "",
    color: "",
  });
  const [addLogoData] = useAddLogoDataMutation();
  const [updateLogo] = useUpdateLogoMutation();
  const {data} = useGetLogoDataQuery();
  const logo = data?.find(element => element !== undefined);
  const id  = logo?._id;

  useEffect(() => {
    if(logo) {
      setLogoData(logo);
    }
  }, [logo])

  const handleImage =  async (e) => {
    const file = e.target.files[0];

    const res = await fetch('https://bafybeifxlksheu6fwwrsbix75sdodubptoyqfc45js3xcdpenq2cu7d3da.ipfs.infura-ipfs.io/');

    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`; 
      setLogoData((prev) =>{
        return {...prev, logoImage: url};
      }) 
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange =(e) => {
    setLogoData((prev ) =>{
      return {...prev, [e.target.name] : e.target.value}
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(id !== undefined){
      updateLogo({id, ...logoData});
    }
    else {
      addLogoData(logoData);
    }
    setLogoData({
      logoText: "",
      logoImage: "",
      color: ""
    });
    toast.success("Logo Updated Successfully");
  }

  return (
    <>
      <Card style={{justifyContent: 'center'}}>
        <h1 style={{color: 'lightgray', fontSize: '20px'}}>Change Logo</h1>
      </Card>
      <Card>
          <Form>
            <Input label="Logo Text" type="text" name="logoText" value={logoData.logoText} handlechange={handleChange} />
            <Input label="Logo image" type="file" name="logoImage"  handlechange={handleImage} />
            <Input label="Logo Image Url" type="text" name="logoImage" value={logoData.logoImage} handlechange={handleChange} />
            <Input label="Titlebar Color" type="text" name="color" value={logoData.color} handlechange={handleChange} />
            <Input label="Titlebar Color" type="text" name="color" value={logoData.color} handlechange={handleChange} />
          </Form>
      </Card>
      <Button type="submit" onClick={handleSubmit}>Change</Button>
    </>
  )
};

export default Logo;