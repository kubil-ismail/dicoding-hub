/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-unescaped-entities */
import { Box, Container } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadListItem from '../components/ThreadListItem';
import Navbar from '../components/Navbar';
import ThreadInput from '../components/ThreadInput';
import { fetchThreadList } from '../states/thread';
import { fetchUserList } from '../states/auth';

function Register() {
  const dispatch = useDispatch();
  const { list: threadList } = useSelector((state) => state.thread);

  React.useEffect(() => {
    dispatch(fetchUserList());
    dispatch(fetchThreadList());
  }, []);

  return (
    <Box minHeight="100vh">
      <Navbar />

      {/* Main */}
      <Box component="main" bgcolor="#F1F2F5" minHeight="100vh" pt="100px">
        <Container>
          {/* Head Thread */}
          <ThreadInput />

          {/* Thread List */}
          {React.Children.toArray(
            threadList?.map((item) => <ThreadListItem item={item} />),
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Register;
