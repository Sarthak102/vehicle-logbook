import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoImage from '../assets/logo.png'; // Path to your logo image

function NavBar() {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'flex-start' }}>
        <img src={LogoImage} alt="Logo" style={{ height: 55, width: 'auto' }} />
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 'auto' }} // Pushes the menu icon to the right
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
