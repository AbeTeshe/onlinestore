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
  Fade,
} from "@material-ui/core";
import { ShoppingCart, Search, Clear, KeyboardArrowDown} from "@material-ui/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/commerce.png";
import useStyles from "./styles";
import { logout } from "../../redux/reducers/authSlice";

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
  const user = useSelector((state) => state.auth.authData);
  const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);
  const history= useHistory();
  const dispatch = useDispatch();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const handleSearch = (e) => {
  setSearchField(e.target.value);
} 

const clear = () => {
  setSearchField("");
}

const handleLogout = () => {
  dispatch(logout());
  history.push("/");
  localStorage.removeItem("userProfile");

}

  return (
    <div>
      {/* <AppBar position="fixed" className={classes.appBar} color="inherit"> */}
      <AppBar position="fixed" color='primary'>
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
                {!user ? <Link to="/login" style={{textDecoration: 'none'}}>
                  <Button id = "login-button" className={classes.loginButton} onClick={handleClose}>
                    login
                  </Button>
                </Link>: 
                <div>
                  <Button
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className={classes.loginButton}
                  >
                    {user?.result?.name?.split(" ")[0]}<KeyboardArrowDown />
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    className={classes.userPopup}
                  >
                    <Link to="/userProfile" style={{textDecoration: 'none'}}>
                       <MenuItem onClick={handleClose}>My Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>}
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
