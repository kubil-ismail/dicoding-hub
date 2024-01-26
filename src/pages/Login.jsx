import React from 'react';
import {
  Box, Button, TextField, Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import http from '../utils/http';
import { isPasswordValid, ErrorAlert } from '../utils/helper';
import { setProfile } from '../states/auth';

function Login() {
  const navigate = useNavigate(useNavigate);
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setErrorMsg('');
      setIsLoading(true);

      const checkPassword = isPasswordValid(password);

      if (checkPassword.status) {
        const request = await http.post('/login', { email, password });

        localStorage.setItem('token', request?.data?.data?.token);

        // Refresh page
        navigate(0);
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
      // Invoking func for get user detail
      http
        .get('/users/me')
        .then((response) => {
          dispatch(setProfile(response?.data?.data?.user));
          navigate('/dashboard');
        })
        .catch((error) => {
          const message = error?.response?.data?.message ?? 'Something wrong in our app';
          setErrorMsg(message);
        });
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

        <ErrorAlert errorMsg={errorMsg} />

        <TextField
          fullWidth
          placeholder="Email address"
          type="email"
          size="medium"
          sx={{ mb: 2 }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          placeholder="Password"
          type="password"
          size="medium"
          sx={{ mb: 3 }}
          name="password"
          id="current-password"
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
          {isLoading ? 'Loading...' : 'Loginss'}
        </Button>

        <Box display="flex" justifyContent="center" mt={2}>
          <Typography>
            Don&apos;t have an account?
            {' '}
            <Link
              to="/register"
              style={{ textDecoration: 'none', color: '#1976D2' }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
