import { makeStyles, fade } from '@material-ui/core/styles';

const drawerWidth = 10;

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: `none`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    textDecoration: 'none',
  },
  sellerBar: {
   backgroundColor: `red`,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },

  logoText: {
  },

  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
  },
  image: {
    marginRight: `10px`,
    height: '25px',
  },

  searchInput: {
    borderRadius: '20px',
    height: '40px',
    width: '100%',
    border: 'none',
    paddingLeft: '20px',
    fontSize: '20px',
    fontWeight: '500',
  },

  loginButton: {
    color: 'white',
    width: '30%'
  },
 
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: 'white',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  searchIcon: {
    fontSize: `20px !important`,
    height: '42px',
    width: '50px',
    color: 'black',
    position: 'absolute',
    backgroundColor: 'white',
    top: '0',
    right: '0',
    borderRadius: '0 20px 20px 0'

  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));