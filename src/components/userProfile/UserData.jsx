
import {  Button, Container, Grid, List, 
    ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';

import {Person, Email, Phone, LocationOn, ShoppingCartCheckout} from "@mui/icons-material";

const UserData = ({userProfile}) => {
    return (
        <Container>
              <Grid container justify="left" spacing={1}>
                  <Grid item xs={12} sm={12} md={6} lg={4} >
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <Person />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Name" secondary={`${userProfile[0]?.firstName} ${userProfile[0]?.lastName}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <Email />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Email" secondary={userProfile[0]?.email} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <Phone />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Phone Number" secondary={userProfile[0]?.phoneNumber} />
                            </ListItem>
                        </List>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4} >
                       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <LocationOn />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Address" secondary={`${userProfile[0]?.city}, ${userProfile[0]?.country}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <LocationOn />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Address Line" secondary={`${userProfile[0]?.addressLine}, ${userProfile[0]?.zipCode}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                    <ShoppingCartCheckout />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Shipping Information" secondary={`${userProfile[0]?.shippingDivision}, ${userProfile[0].shippingOption}`} />
                            </ListItem>
                        </List>
                  </Grid>
              </Grid>
          </Container>
    )
}

export default UserData;