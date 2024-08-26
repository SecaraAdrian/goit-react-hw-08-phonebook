import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Typography, Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function UserMenu({ email, name, avatar, onLogout }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Avatar alt={name} src={avatar} sx={{ mr: 2 }} />
      <Typography variant="body1" sx={{ flexGrow: 1 }}>
        {name} ({email})
      </Typography>
      <IconButton color="inherit" onClick={onLogout}>
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}

UserMenu.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default UserMenu;
