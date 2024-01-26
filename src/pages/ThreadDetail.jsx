/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-unescaped-entities */
import {
  Box, Container, Typography, Breadcrumbs,
} from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentListItem from '../components/CommentListItem';
import ThreadHeadDetail from '../components/ThreadHeadDetail';
import Navbar from '../components/Navbar';
import CommentInput from '../components/CommentInput';
import { fetchThreadDetail } from '../states/thread';

function ThreadDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: thread } = useSelector((state) => state.thread);

  React.useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, []);

  return (
    <Box>
      <Navbar />

      {/* Main */}
      <Box
        component="main"
        bgcolor="#F1F2F5"
        minHeight="90vh"
        pb="50px"
        pt="100px"
      >
        <Container>
          {/* Link */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Typography>
              <Link
                to="/dashboard"
                style={{ textDecoration: 'none', color: '#1976D2' }}
              >
                Dashboard
              </Link>
            </Typography>
            <Typography color="text.primary">{thread?.owner?.name}</Typography>
            <Typography color="text.primary">{id}</Typography>
          </Breadcrumbs>

          {/* Thread Main */}
          <ThreadHeadDetail thread={thread} />

          {/* Thread Comment */}
          <Box mt={3}>
            <Typography variant="h4" fontSize="18px">
              {thread?.comments?.length}
              {' '}
              Comments
            </Typography>

            {React.Children.toArray(
              (thread?.comments ?? [])?.map((item) => (
                <CommentListItem item={item} />
              )),
            )}
          </Box>

          {/* Comment Box */}
          <CommentInput />
        </Container>
      </Box>
    </Box>
  );
}

export default ThreadDetail;
