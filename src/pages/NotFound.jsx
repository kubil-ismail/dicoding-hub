import { Box, Typography } from '@mui/material';
import React from 'react';

function NotFound() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <div>
        <Typography align="center" variant="h1" fontSize="100px">
          404
        </Typography>
        <Typography align="center" variant="h2" fontSize="20px" gutterBottom>
          Not Found
        </Typography>
        <Typography align="center">
          The resource requested could not be found on this server
        </Typography>
      </div>
    </Box>
  );
}

export default NotFound;
