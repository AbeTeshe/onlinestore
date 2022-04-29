import "./sidebar.css";
import {useState} from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../../redux/reducers/stateSlices";
import {create} from 'ipfs-http-client';
import {useUpdateLogoMutation} from "../../../redux/services/apiSlice";
import { toast } from 'react-toastify';

const client = create('https://ipfs.infura.io:5001');

const Sidebar = () => {
  const [changeLogo, setChangeLogo] = useState(false);
  const [logoData, setLogoData] = useState({
    logoText: "",
    logoImage: ""
  });

  const [updateLogo] = useUpdateLogoMutation();

  const id='62601a178676685899526a77';

  const dispatch = useDispatch();
  const handlePage = (page) => {
    dispatch(setPage(page))
  }


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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLogo({id, ...logoData});
    setChangeLogo(false);
    setLogoData({
      logoText: "",
      logoImage: ""
    });
    toast.success("Logo Updated Successfully");
  }
  
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="sidebarLogo">shopinetx</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={() => handlePage("home")}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="sideBarTitle">LISTS</p>
            <li onClick={() => handlePage("userList")}>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
            <li onClick={() => handlePage("productList")}>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          <li onClick={() => handlePage("orders")}>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li onClick={() => handlePage("invoices")}>
            <ReceiptIcon className="icon" />
            <span>Invoices</span>
          </li>
          <p className="title">SETTING</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <DashboardCustomizeIcon className="icon" />
            <span>Customize</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          <button className="logoChangeButton" onClick={()=> setChangeLogo(!changeLogo)}>CHANGE LOGO</button>
          <li>
           {changeLogo && <div style={{display: 'flex', flexDirection: 'column'}}> <form>
              <div className="logoFormInput">
                <label>Logo Text</label>
                <input type="text" name="logoText" value={logoData.logoText} onChange={(e) => setLogoData({...logoData, logoText: e.target.value})} placeholder=""/>
              </div>
              <div className="logoFormInput">
                <label>Logo image</label>
                <input type="file" name="logoImage"  onChange={handleImage}/>
              </div>
              <div className="logoFormInput">
                <label>Logo Image Url</label>
                <input type="text" name="logoImage" value={logoData.logoImage} onChange={(e) => setLogoData({...logoData, logoImage: e.target.value})} placeholder=""/>
              </div>
            </form>
            <button typpe="submit" onClick={handleSubmit} className="changeLogoButton">Change</button></div>
            }
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;