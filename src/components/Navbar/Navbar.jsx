import React, {useState} from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/commerce.png";
import useStyles from "./styles";


const styles = {
  root: {
    flexGrow: 1
  },
  typography: {
    top: "auto",
    bottom: 0,
    textAlign:"center",
  }
};

const Navbar = ({ totalItems }) => {

  const [searchField, setSearchField] = useState("");

  const classes = useStyles();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const details = useSelector(state => state?.main?.products);

  const handleLogin = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const handleSearch = (e) => {
  setSearchField(e.target.value);
  console.log(e.target.value);
} 

const filteredProducts = details.filter(
  product => {
    return (
      product
      .name
      .toLowerCase()
      .includes(searchField.toLowerCase()) 
      // ||
      // product
      // .price
      // .toLowerCase()
      // .includes(searchField.toLowerCase())
    );
  }
);

function searchList() {
  if (searchShow) {
    return (
        <SearchList filteredProducts={filteredProducts} />
    );
  }
}
  return (
    <div>
      {/* <AppBar position="fixed" className={classes.appBar} color="inherit"> */}
      <AppBar position="fixed" color='primary'>
        <Toolbar>
          
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.appBar}
            color="inherit"
          >
            <img
              src={logo}
              alt="Shopinext's E-Commerce"
              height="25px"
              className={classes.image}
            />
            Shopinext 
             </Typography>
             {/* search product */}
             <div className={classes.search}>
            <input  
					  type = "search" 
				  	placeholder = "Search Products" 
					  onChange = {handleSearch}
			  	/>
            </div>
             <div className={classes.grow} />
              {location.pathname === "/" && (
             <div className={classes.button}>
                 <Button 
                id = "login-button"
                aria-controls={open ? 'login-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick = {handleLogin}
                >
                login
                </Button>
                
                <Menu
                id="login-menu"
                 anchorEl={anchorEl}
                 open={open}
                 onClose={handleClose}
                 MenuListProps={{
                 'aria-labelledby': 'login-button',
                 }}
      >
         <MenuItem>Login Form</MenuItem>
        <MenuItem><TextField id="outlined-basic" label="User Name" variant="outlined" /></MenuItem>
        <MenuItem><TextField id="outlined-basic" label="Password" variant="outlined" /></MenuItem>
        <MenuItem><FormControlLabel control={<Checkbox defaultChecked/>} label="Admin / Seller" /></MenuItem>
        <MenuItem><Button 
        component={Link}
        to="/seller"
        aria-lable="Seller Dashboard"
        color="inherit"
        variant="contained">
          Login
        </Button></MenuItem>
        <MenuItem>Forget password ?</MenuItem>
        <MenuItem>Register new user</MenuItem>
        </Menu>
                {/* <IconButton 
                component={Link}
                to="/login"
                aria-label="Login"
                color="inherit"
                >
                login
                </IconButton> */}
                </div>
                )}
                
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart item"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
