import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import http from '../utils/http';
import { ErrorAlert } from '../utils/helper';
import { fetchThreadList } from '../states/thread';

function ThreadInput() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setErrorMsg('');
      setIsLoading(true);

      await http.post('/threads', { title, category, body: content });
      dispatch(fetchThreadList());

      setIsLoading(false);
      setIsOpenModal(false);
    } catch (error) {
      const message = error?.response?.data?.message ?? 'Something wrong in our app';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategory = (value) => {
    setCategory(value);
    setAnchorEl(null);
  };

  return auth?.profile ? (
    <div>
      <Box
        bgcolor="#fff"
        className="shadow-1"
        p={2}
        gap={2}
        mb={4}
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
          <Typography align="left">
            What&apos;s on your mind,
            {' '}
            {auth?.profile?.name}
            {' '}
            ?
          </Typography>
        </Button>
      </Box>

      <Dialog
        PaperProps={{ sx: { borderRadius: '10px' } }}
        onClose={() => setIsOpenModal(false)}
        open={isOpenModal}
      >
        <Box position="relative" py={2} borderBottom="1px solid #E5E5E5">
          <Typography variant="h5" align="center">
            Create Thread
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
              <Button
                sx={{
                  m: 0, p: 0, minWidth: 0, textTransform: 'capitalize',
                }}
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                {category || 'Select Category'}
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={() => handleCategory('question')}>
                  Question
                </MenuItem>
                <MenuItem onClick={() => handleCategory('sharing')}>
                  Sharing
                </MenuItem>
                <MenuItem onClick={() => handleCategory('opinion')}>
                  Opinion
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          <TextField
            variant="standard"
            InputProps={{ disableUnderline: true }}
            placeholder="Title thread"
            fullWidth
            multiline
            autoFocus
            required
            onChange={(e) => setTitle(e.target.value)}
            margin="dense"
          />
          <Box minHeight="150px">
            <TextField
              variant="standard"
              InputProps={{ disableUnderline: true }}
              placeholder="What's on your mind Bilkis?"
              fullWidth
              multiline
              autoFocus
              required
              onChange={(e) => setContent(e.target.value)}
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
            {isLoading ? 'Loading...' : 'Create Thread'}
          </Button>
        </Box>
      </Dialog>
    </div>
  ) : null;
}

export default ThreadInput;
