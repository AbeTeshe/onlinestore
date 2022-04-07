import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";


const Sidebar = ({setPage}) => {
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
          <li onClick={() => setPage("home")}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="sideBarTitle">LISTS</p>
            <li onClick={() => setPage("userList")}>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
            <li onClick={() => setPage("productList")}>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          <li onClick={() => setPage("orders")}>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
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

export default Sidebar;