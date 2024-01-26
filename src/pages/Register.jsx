/* eslint-disable react/no-unescaped-entities */
import {
  Box, Button, TextField, Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import http from '../utils/http';
import { isPasswordValid, ErrorAlert, SuccessAlert } from '../utils/helper';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setErrorMsg('');
      setIsLoading(true);

      const checkPassword = isPasswordValid(password);

      if (checkPassword.status) {
        await http.post('/register', {
          email,
          password,
          name: fullname,
        });

        setSuccessMsg('Register successfully, please login for continue.');

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrorMsg(checkPassword.message);
      }

      setIsLoading(false);
    } catch (error) {
      const message = error?.response?.data?.message ?? 'Something wrong in our app';
      setErrorMsg(message);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Force redirect to dashboard if already login
      navigate('/dashboard');
    }
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Box component="form" maxWidth="450px" onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Box component="img" src="/logo.png" width="200px" alt="logo" />
        </Box>

        <SuccessAlert successMsg={successMsg} />
        <ErrorAlert errorMsg={errorMsg} />

        <TextField
          placeholder="Fullname"
          size="medium"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setFullname(e.target.value)}
        />
        <TextField
          placeholder="Email address"
          type="email"
          size="medium"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Password"
          type="password"
          size="medium"
          fullWidth
          sx={{ mb: 3 }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          type="submit"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? 'Loading...' : 'Register'}
        </Button>

        <Box display="flex" justifyContent="center" mt={2}>
          <Typography>
            Already have an account?
            {' '}
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: '#1976D2' }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
