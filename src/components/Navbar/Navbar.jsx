import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  InputBase ,
  Typography,
  Button,
  Fade,
} from "@material-ui/core";
import { ShoppingCart, Search, Clear, KeyboardArrowDown} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import logos from "../../assets/commerce.png";
import useStyles from "./styles";
import { logout } from "../../redux/reducers/authSlice";
import { setLoginPlace} from "../../redux/reducers/stateSlices";

import {useGetLogoDataQuery} from "../../redux/services/apiSlice";
import HOC from "../HOC";

const Navbar = ({user, handleAppPage, searchField, setSearchField, anchorEl,setAnchorEl, handleClose, showSearch }) => {
  const classes = useStyles();
  const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const {data: logoData} = useGetLogoDataQuery();
  const logo = logoData?.find(element => element !== undefined);
  const appPage = useSelector((state) => state.states.appPage);

  const open = Boolean(anchorEl);
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
const handleSearch = (e) => {
  setSearchField(e.target.value);
} 

const clear = () => {
  setSearchField("");
}

const handleLogout = () => {
  dispatch(logout());
  handleAppPage('productPage');
  localStorage.removeItem("userProfile");
}



const loginHandler = () => {
  handleClose();
  dispatch(setLoginPlace("login"));
  handleAppPage("login");
}

const handleProfileLink = () => {
  handleClose();
  handleAppPage("userProfile");
}

  return (
    <div>
      <AppBar position="fixed" color='primary' style={{backgroundColor: logo?.color || '#3f51b5'}} className={classes.appBarContainer}>
          <Toolbar >
            <Typography onClick={() => handleAppPage('productPage')} variant="h6" className={classes.appBar} color="inherit">
                  <div className={classes.logoContainer}>
                  <img
                    src={logo?.logoImage || logos}
                    alt="Shopinext's E-Commerce"
                    className={classes.image}
                  />
                  <p className={classes.logoText}>{logo?.logoText || 'Shopinext'} </p>
                </div>
            </Typography>
            <div className={classes.search}>  
                {(appPage==='productPage') && <div className={classes.searchBox}>
                  <InputBase  
                    type = "text" 
                    name="searchField"
                    value={searchField}
                    placeholder = "Search Products" 
                    onChange = {handleSearch}
                    className={classes.searchInput} />
                    {searchField && <Clear className={classes.clearSearch} onClick={clear} style={{fontSize: "small"}}/> }
                    {!searchField && <Search className={classes.searchIcon} />}
                </div>}
            </div>
            <div className={classes.grow} />
            <div className={classes.button}>
                {!user ? 
                  <Button id = "login-button" className={classes.loginButton} onClick={loginHandler}>
                    login
                  </Button>: 
                <div>
                  <Button
                    onClick={handleClick}
                    className={classes.loginButton}
                  >
                    {user?.result?.name?.split(" ")[0]}<KeyboardArrowDown />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={anchorEl}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    className={classes.userPopup}
                  >
                    <MenuItem onClick={handleProfileLink}>My Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>}
          </div>     
          <div className={classes.grow} />
            <Button style={{color: 'white', width: '100px'}} color="secondary" onClick={() => handleAppPage('admin')} >Admin</Button>
            <div className={classes.headerCartButton}>
              <IconButton
                onClick={() => handleAppPage('cart')} 
                aria-label="Show cart item"
                color="inherit"
              >
                <Badge badgeContent={cartTotalQuantity} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
      </AppBar>
    </div>
  );
};

export default HOC(Navbar);
