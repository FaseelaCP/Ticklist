import React, { useState, useRef, useContext } from 'react';
import { Modal, Paper, TextField, Button, Typography, Tabs, Tab } from '@mui/material';
import { AuthContext } from '../Context/AuthContext';

const LoginModal = ({ open, onClose }) => {
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // New state for signup email
  const [activeTab, setActiveTab] = useState(0); // 0 for Login, 1 for Signup
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTabChange = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const handleLogin = () => {
    // Hardcoded credentials (for development purposes)
    const hardcodedUsername = 'user';
    const hardcodedPassword = 'password';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      // Call login function from AuthContext to set logged-in state
      login();
      onClose(); // Close the modal
    } else {
      console.log('Invalid username or password');
      // Handle invalid credentials (show error message, clear fields, etc.)
    }
  };

  const handleSignup = () => {
    // Implement signup functionality, e.g., call API to register user
    console.log('Signing up with:', username, email, password);
    // Close modal after signup (if successful)
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (activeTab === 0) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>TICKLIST</Typography>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <form onSubmit={handleSubmit}>
          {activeTab === 0 ? (
            <>
              <TextField
                label="Username"
                variant="standard"
                margin="normal"
                value={username}
                onChange={handleUsernameChange}
                inputRef={usernameRef}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                variant="standard"
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
                inputRef={passwordRef}
                required
                fullWidth
              />
            </>
          ) : (
            <>
              <TextField
                label="Username"
                variant="standard"
                margin="normal"
                value={username}
                onChange={handleUsernameChange}
                inputRef={usernameRef}
                required
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                variant="standard"
                margin="normal"
                value={email}
                onChange={handleEmailChange}
                inputRef={emailRef}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                variant="standard"
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
                inputRef={passwordRef}
                required
                fullWidth
              />
            </>
          )}
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            {activeTab === 0 ? 'Login' : 'Sign Up'}
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default LoginModal;
