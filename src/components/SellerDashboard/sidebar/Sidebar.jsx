import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import {Card} from "../../index";
import { useDispatch } from "react-redux";
import HOC from "../../HOC";


const Sidebar = ({handleAdminPage}) => {

  return (
    <div className="sidebar">
      <Card className="top">
          <span className="sidebarLogo">Hosted on IPFS</span>
      </Card>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li onClick={() => handleAdminPage("home")}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="sideBarTitle">LISTS</p>
          <li onClick={() => handleAdminPage("userList")}>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
          </li>
            <li onClick={() => handleAdminPage("productList")}>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          <li onClick={() => handleAdminPage("orders")}>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li onClick={() => handleAdminPage("invoices")}>
            <ReceiptIcon className="icon" />
            <span>Invoices</span>
          </li>
          <p className="title">SETTING</p>
          <li onClick={() => handleAdminPage("profile")}>
            <ArticleOutlinedIcon className="icon" />
            <span>License</span>
          </li>
          <li onClick={() => handleAdminPage("logo")}>
            <DashboardCustomizeIcon className="icon" />
            <span>Customize</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HOC(Sidebar);