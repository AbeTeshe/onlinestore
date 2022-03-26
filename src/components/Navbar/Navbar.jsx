import React, {useState, useEffect} from "react";
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
import { ShoppingCart, Search, Clear} from "@material-ui/icons";
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


const Navbar = ({  searchField, setSearchField }) => {
  const classes = useStyles();
  const location = useLocation();

  const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);
  
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  const details = useSelector(state => state?.main?.products);

  // const handleLogin = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
const handleSearch = (e) => {
  setSearchField(e.target.value);
} 

const clear = () => {
  setSearchField("");
}

// const filteredProducts = details.filter(
//   product => {
//     return (
//       product
//       .name
//       .toLowerCase()
//       .includes(searchField.toLowerCase()) 
//       // ||
//       // product
//       // .price
//       // .toLowerCase()
//       // .includes(searchField.toLowerCase())
//     );
//   }
// );




// function searchList() {
//   if (searchShow) {
//     return (
//         <SearchList filteredProducts={filteredProducts} />
//     );
//   }
// }
  return (
    <div>
      {/* <AppBar position="fixed" className={classes.appBar} color="inherit"> */}
      <AppBar position="fixed" color='primary' >
          <Toolbar >
            <Typography component={Link} to="/" variant="h6" className={classes.appBar} color="inherit">
                <div className={classes.logoContainer}>
                  <img
                    src={logo}
                    alt="Shopinext's E-Commerce"
                    className={classes.image}
                  />
                  <p className={classes.logoText}>Shopinext </p>
                </div>
            </Typography>
              {/* search product */}
            <div className={classes.search}>  
                <div className={classes.searchBox}>
                  <input  
                    type = "text" 
                    name="searchField"
                    value={searchField}
                    placeholder = "Search Products" 
                    onChange = {handleSearch}
                    className={classes.searchInput} />
                    {searchField && <Clear className={classes.clearSearch} onClick={clear} style={{fontSize: "small"}}/> }
                    {!searchField && <Search className={classes.searchIcon} />}
                </div>
            </div>
            <div className={classes.grow} />
            {/* {location.pathname === "/" && ( */}
            <div className={classes.button}>
                <Link to="/login" style={{textDecoration: 'none'}}>
                  <Button id = "login-button" className={classes.loginButton}>
                    login
                  </Button>
                </Link>
              
              {/* <IconButton 
              component={Link}
              to="/login"
              aria-label="Login"
              color="inherit"
              >
              login
              </IconButton> */}
          </div>
                  {/* )} */}
                  
          <div className={classes.grow} />
          {/* {location.pathname === "/" && ( */}
            <div className={classes.headerCartButton}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart item"
                color="inherit"
              >
                <Badge badgeContent={cartTotalQuantity} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
            {/* )} */}
          </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
