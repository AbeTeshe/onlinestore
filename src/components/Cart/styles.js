import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '20px',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '700',
    fontSize: '40px'
  },
  emptyCartContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  subtitle: {
    textAlign: 'center'
  },
  AddEmptyButton: {
    "&:hover": {
      backgroundColor: '#c5a491'
  },
  backgroundColor: '#ab7a5f',
  marginTop: '20px',
  color: 'white',
  margin: 'auto'

  },

  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  cartContainer: {
    maxWidth: '1600px',
    marginleft: 'auto',
    marginRight: 'auto'
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
}));