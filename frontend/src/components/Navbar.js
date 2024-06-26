import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText, Divider, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Notifications, Settings, Language } from '@mui/icons-material';
import logo from '../logo.png'; // Import your logo image
import { clearLocalStorage, loadFromLocalStorage } from '../utils/utils';
import CopyText from './CopyText';
import { decode64 } from '../utils/cryptoFunctions';


function Navbar() {
  const theme = useTheme();
  const color = "#9C27B0";
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navegate = useNavigate();
  const [did, setDid] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getDid = loadFromLocalStorage("did");
    setDid(decode64(getDid));
  }, []);

  return (
    <AppBar position="static" sx={{ color: color, backgroundColor: 'white', borderColor: color }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="Logo" style={{ width: 100 }} /> {/* Adjust the height as needed */}
          </Link>
        </Typography>
        <Typography width={"30%"}>
          <CopyText text={did}/>
        </Typography>
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Language />
                </ListItemIcon>
                <ListItemText primary="Language" />
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </MenuItem>
              <Divider />
              <MenuItem component={Link} to="/profile">
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button
              onClick={
                  () => {
                    clearLocalStorage();
                    navegate('/');
                  }
              }
            >
              Logout
            </Button>
            {/* <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <IconButton color="inherit">
              <Language />
            </IconButton>
            <IconButton color="inherit">
              <Settings />
            </IconButton> */}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
