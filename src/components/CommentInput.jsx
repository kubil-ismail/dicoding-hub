import React from 'react';
import {
  Box, Button, Dialog, TextField, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import http from '../utils/http';
import { ErrorAlert } from '../utils/helper';
import { fetchThreadDetail } from '../states/thread';

function CommentInput() {
  const { id } = useParams();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setErrorMsg('');
      setIsLoading(true);

      await http.post(`/threads/${id}/comments`, { content: commentText });
      dispatch(fetchThreadDetail(id));

      setIsLoading(false);
      setIsOpenModal(false);
    } catch (error) {
      const message = error?.response?.data?.message ?? 'Something wrong in our app';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return auth?.profile ? (
    <div>
      <Box
        bgcolor="#fff"
        className="shadow-1"
        p={2}
        gap={2}
        my={4}
        display="flex"
        sx={{ borderRadius: '5px' }}
      >
        <Box
          component="img"
          alt="profile"
          width="40px"
          height="40px"
          src={auth?.profile?.avatar}
          sx={{ borderRadius: '50%', bgcolor: 'gray' }}
        />

        <Button
          sx={{
            bgcolor: '#F1F2F5',
            borderRadius: '30px',
            justifyContent: 'flex-start',
            px: 2,
          }}
          onClick={() => setIsOpenModal(true)}
          fullWidth
        >
          <Typography align="left">Write a public comment...</Typography>
        </Button>
      </Box>

      <Dialog
        PaperProps={{ sx: { borderRadius: '10px' } }}
        onClose={() => setIsOpenModal(false)}
        open={isOpenModal}
      >
        <Box position="relative" py={2} borderBottom="1px solid #E5E5E5">
          <Typography variant="h5" align="center">
            Create Comment
          </Typography>
        </Box>
        <Box component="form" width="500px" p={2} onSubmit={handleSubmit}>
          <Box display="flex" gap={1} mb={1}>
            <Box
              component="img"
              alt="profile"
              width="40px"
              height="40px"
              src={auth?.profile?.avatar}
              sx={{ borderRadius: '50%', bgcolor: 'gray' }}
            />
            <Box>
              <Typography variant="h6">{auth?.profile?.name}</Typography>
              <Typography variant="body2" fontSize="13px">
                {id}
              </Typography>
            </Box>
          </Box>

          <Box minHeight="150px">
            <TextField
              variant="standard"
              InputProps={{ disableUnderline: true }}
              placeholder="What's on your mind Bilkis?"
              fullWidth
              multiline
              autoFocus
              required
              onChange={(e) => setCommentText(e.target.value)}
            />
          </Box>

          <ErrorAlert errorMsg={errorMsg} />
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? 'Loading...' : 'Comment'}
          </Button>
        </Box>
      </Dialog>
    </div>
  ) : null;
}

export default CommentInput;
