import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  Grid,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Paper,
  Alert,
  MenuItem,
  Snackbar,
  IconButton,
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setGender('');
    setAvatar('');
    setTermsAccepted(false);
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      if (!termsAccepted && activeTab === 1) {
        setError('You must accept the terms and conditions to register.');
        setOpenSnackbar(true);
        return;
      }

      const userData = { email, password, name, phone, gender, avatar };

      if (activeTab === 0) {
        const response = await loginUser(userData);
        onLogin(response);
      } else {
        if (password.length < 8) {
          setError('Password must be at least 8 characters long.');
          return;
        }
        const response = await registerUser(userData);
        setSuccessMessage('Registration successful! Redirecting...');
        setOpenSnackbar(true);
        onLogin(response);
      }
    } catch (error) {
      setError(error.message || 'Error occurred during registration');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, mt: 8, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
          <Typography component="h1" variant="h5">
            {activeTab === 0 ? 'Sign in' : 'Sign up'}
          </Typography>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {activeTab === 1 && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ input: { color: '#fff' }, label: { color: '#8e8e8e' } }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ input: { color: '#fff' }, label: { color: '#8e8e8e' } }}
                />
                <TextField
                  select
                  margin="normal"
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  sx={{ input: { color: '#fff' }, label: { color: '#8e8e8e' } }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
                <TextField
                  margin="normal"
                  fullWidth
                  id="avatar"
                  label="Avatar URL"
                  name="avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  sx={{ input: { color: '#fff' }, label: { color: '#8e8e8e' } }}
                />
                <FormControlLabel
                  control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} color="primary" />}
                  label="I accept the terms and conditions"
                  sx={{ color: '#8e8e8e', mt: 1 }}
                />
              </>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ input: { color: '#fff' }, label: { color: '#8e8e8e' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ input: { color: '#fff' }, label: { color: '#8e8e8e' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {activeTab === 0 && (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ color: '#8e8e8e' }}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#00e676', color: '#fff', '&:hover': { backgroundColor: '#00c853' } }}
            >
              {activeTab === 0 ? 'Sign In' : 'Sign Up'}
            </Button>
            <Grid container>
              {activeTab === 0 ? (
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{ color: '#00e676' }}>
                    Forgot password?
                  </Link>
                </Grid>
              ) : (
                <Grid item xs>
                  <Link href="/auth" variant="body2" sx={{ color: '#00e676' }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage || error}
        action={
          <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </Container>
  );
}

export default AuthPage;
