import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { TextField, Button, Container, Typography, Box, Link, Grid, Checkbox, FormControlLabel } from '@mui/material';
import '../App'; // Importă stilurile CSS personalizate

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await loginUser(userData);
      onLogin(response); // Actualizează starea aplicației după succesul autentificării
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: '#00e676' }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ input: { color: '#fff' }, label: { color: '#8e8e8e' } }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{ color: '#8e8e8e' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#00e676', color: '#fff', '&:hover': { backgroundColor: '#00c853' } }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ color: '#00e676' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2" sx={{ color: '#00e676' }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
