import React from 'react';
import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    auth,
    thread: { isLoading },
  } = useSelector((state) => state);

  return (
    <Box
      component="header"
      bgcolor="#fff"
      className="shadow-1"
      height="70px"
      width="100%"
      position="fixed"
      zIndex={50}
    >
      <LinearProgress sx={{ display: isLoading ? 'block' : 'none'}} />

      <Container>
        <Box
          component="nav"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2}
        >
          <Box component="img" src="/logo.png" alt="logo" width="100px" />

          {auth?.profile ? (
            <Box
              component="img"
              alt="profile"
              width="40px"
              height="40px"
              src={auth?.profile?.avatar}
              sx={{ borderRadius: '50%', bgcolor: 'gray', cursor: 'pointer' }}
              onClick={(event) => setAnchorEl(event.currentTarget)}
            />
          ) : (
            <Box display="flex" gap={1}>
              <Link to="/login">
                <Button variant="outlined" sx={{ py: 0.7 }}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="contained">Register</Button>
              </Link>
            </Box>
          )}
        </Box>
      </Container>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            minWidth: '150px',
            mt: 1,
          },
        }}
      >
        <Box
          display="flex"
          borderBottom="1px solid #E5E5E5"
          pb={1}
          gap={1}
          alignItems="center"
          px={1}
        >
          <Box
            component="img"
            alt="profile"
            width="35px"
            height="35px"
            src={auth?.profile?.avatar}
            sx={{ borderRadius: '50%', bgcolor: 'gray' }}
          />
          <Box>
            <Typography variant="h6" noWrap>
              {auth?.profile?.name}
            </Typography>
            <Typography variant="body2" noWrap>
              {auth?.profile?.email}
            </Typography>
          </Box>
        </Box>
        <MenuItem
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Navbar;
