import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import UserMenu from './components/UserMenu';
import AuthPage from './components/AuthPage';
import ContactsPage from './components/ContactsPage';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e676',
    },
    secondary: {
      main: '#2979ff',
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ email: '', name: '', avatar: '' });

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ email: '', name: '', avatar: '' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={process.env.NODE_ENV === 'production' ? "/goit-react-hw-08-phonebook" : "/"}>
        <div>
          {isLoggedIn && (
            <>
              <Navigation isLoggedIn={isLoggedIn} />
              <UserMenu email={user.email} name={user.name} avatar={user.avatar} onLogout={handleLogout} />
            </>
          )}
          <Routes>
            <Route path="/auth" element={isLoggedIn ? <Navigate to="/contacts" /> : <AuthPage onLogin={handleLogin} />} />
            <Route path="/contacts" element={isLoggedIn ? <ContactsPage /> : <Navigate to="/auth" />} />
            <Route path="/" element={<Navigate to={isLoggedIn ? "/contacts" : "/auth"} />} />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/contacts" : "/auth"} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
