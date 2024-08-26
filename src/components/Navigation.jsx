import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Navigation({ isLoggedIn }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Phonebook
        </Typography>
        {!isLoggedIn ? (
          <Button color="inherit" component={Link} to="/auth" startIcon={<LockOpenIcon />}>
            Login / Register
          </Button>
        ) : (
          <IconButton color="inherit" component={Link} to="/contacts">
            <ContactsIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navigation;
