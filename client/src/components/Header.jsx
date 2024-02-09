import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import logo from 'https://img.icons8.com/bubbles/344/amazon-alexa-logo.png';
import { theme } from '../Utils/Theme';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import {useSelector} from "react-redux"

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const styles = {
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
    color:"white",
    fontSize: 24,
    marginLeft:'20px'

  },
  tabs: {
    marginLeft: 'auto',
    '& .MuiButtonBase-root.MuiTab-root': {
      fontSize: 16,
    },
    '& .Mui-selected': {
      backgroundColor: 'white',
      color: '#000',
      opacity: 0.7,
      borderRadius: 2,
    },
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
    color: 'white',
    padding: '0 12px',
    marginRight: '12px',
    textTransform: 'capitalize',
    fontSize: '14px',
    fontWeight: 'bold',
    '&:hover': {
      color: 'primary.dark',
    },
    '&.Mui-selected': {
      color: 'secondary.main',
    },
  },

  hamburgerMenuIcon: {
    height: '50px',
    width: '50px',
  },
  menuIconContainer: {
    marginLeft: 'auto',
    color: 'white',
    '&:hover': {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor:"#42A5F5",
    padding:"10px"
  },
};

const DesktopNavigation = () => {
  const [value, setValue] = useState(0);
  const cartSelector = useSelector((store)=>store.cart)
  let totalCartCount = 0
  if(cartSelector.length==0){
    totalCartCount = 0
  }else{
    totalCartCount = cartSelector.reduce((total, item) => total + item.count, 0) || 0

  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="nav tabs example"
      sx={styles.tabs}
    >
      <Tab sx={styles.tab} label="Home" component={Link} to="/" />
      <Tab sx={styles.tab} label="Products" component={Link} to="/products" />
      <Tab sx={styles.tab} label="Add products" component={Link} to="/addProducts" />
      <Tab sx={styles.tab} icon={<StyledBadge badgeContent={totalCartCount} color="secondary"><ShoppingCartIcon /></StyledBadge>} component={Link} to="/cart" />
    </Tabs>
  );
};

const MobileNavigation = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <Box sx={styles.toolbarMargin} />
        <Paper>
          <List disablePadding>
            <ListItem
              divider
              button
              component={Link}
              to="/"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText disableTypography>Home</ListItemText>
            </ListItem>
            <ListItem
              divider
              button
              component={Link}
              to="/products"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText disableTypography>Products</ListItemText>
            </ListItem>
            <ListItem
              divider
              button
              component={Link}
              to="/addProducts"
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText disableTypography>Add Products</ListItemText>
            </ListItem>
          </List>
        </Paper>
      </SwipeableDrawer>
      <IconButton
        sx={styles.menuIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon sx={styles.hamburgerMenuIcon} />
      </IconButton>
    </React.Fragment>
  );
};

const Header = () => {
  const isMobileMode = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fragment>
      <AppBar
        position="fixed"
        sx={styles.appbar}
        color="secondary"
        elevation={9}
      >
        <Toolbar disableGutters={true}>
          <Button
            disableRipple
            component={Link}
            to="/"
            sx={styles.logoContainer}
          >
            <Box alt="company logo" />
            S-CART
          </Button>
          {isMobileMode ? <MobileNavigation /> : <DesktopNavigation />}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
