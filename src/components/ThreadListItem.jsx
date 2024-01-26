/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Tooltip, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import { useSelector } from 'react-redux';
import http from '../utils/http';
import { formatDate, formatDateWithTime } from '../utils/helper';

function ThreadListItem({ item }) {
  const {
    id = 0,
    ownerId = 0,
    upVotesBy = [],
    downVotesBy = [],
    createdAt = '',
    category = 'uncategorized',
    title = 'Title not found',
    body = 'Content not found',
    totalComments = 0,
  } = item;
  const { users, profile } = useSelector((state) => state.auth);
  const [totalVoteUp, setTotalVoteUp] = React.useState(0);
  const [totalVoteDown, setTotalVoteDown] = React.useState(0);
  const [hasVoteUp, setHasVoteUp] = React.useState(false);
  const [hasVoteDown, setHasVoteDown] = React.useState(false);
  const selectedUser = users?.find((child) => child?.id === ownerId);

  const handleVoteUp = async () => {
    try {
      // check if not yet vote up
      if (!hasVoteUp) {
        setTotalVoteUp((prev) => prev + 1);
        await http.post(`/threads/${id}/up-vote`, { voteType: 1 });
        setHasVoteUp(true);
      } else {
        setHasVoteUp(true);
      }
    } catch (error) {
      setHasVoteUp(true);
    }
  };

  const handleVoteDown = async () => {
    try {
      // check if not yet vote down
      if (!hasVoteDown) {
        setTotalVoteDown((prev) => prev + 1);
        await http.post(`/threads/${id}/down-vote`, { voteType: -1 });
        setHasVoteDown(true);
      } else {
        setHasVoteDown(true);
      }
    } catch (error) {
      setHasVoteDown(true);
    }
  };

  React.useEffect(() => {
    const isAlreadyVoteUp = Boolean(
      upVotesBy?.find((child) => child === profile?.id),
    );
    const isAlreadyVoteDown = Boolean(
      downVotesBy?.find((child) => child === profile?.id),
    );

    setTotalVoteUp(upVotesBy?.length ?? 0);
    setTotalVoteDown(downVotesBy?.length ?? 0);
    setHasVoteUp(isAlreadyVoteUp);
    setHasVoteDown(isAlreadyVoteDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <Box
      bgcolor="#fff"
      className="shadow-1"
      p={2}
      mb={3}
      sx={{ borderRadius: '5px' }}
    >
      <Link to={`/dashboard/${id}`} style={{ textDecoration: 'none' }}>
        <Box sx={{ cursor: 'pointer' }}>
          <Box display="flex" gap={2} mb={1} sx={{ cursor: 'pointer' }}>
            <Box
              component="img"
              alt="profile"
              width="40px"
              height="40px"
              src={selectedUser?.avatar}
              sx={{ borderRadius: '50%', bgcolor: 'gray' }}
            />

            <Box>
              <Typography variant="h6">{selectedUser?.name}</Typography>
              <Box display="flex" gap={1}>
                <Tooltip title={formatDateWithTime(createdAt)} arrow>
                  <Typography variant="body2">
                    {formatDate(createdAt)}
                  </Typography>
                </Tooltip>
                <Typography variant="body2">|</Typography>
                <Typography
                  variant="body2"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {category}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>

          <Box
            sx={{ color: '#444444', fontSize: '15px' }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </Box>
      </Link>
      {/* Bottom Content */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        mt={2}
      >
        {/* Vote group */}
        <Box display="flex" gap={0.5}>
          <Tooltip title="Vote Up" arrow>
            <Button
              sx={{ justifyContent: 'flex-start', minWidth: 0 }}
              size="small"
              startIcon={
                <ArrowCircleUpTwoToneIcon
                  sx={{ width: '20px', height: '20px' }}
                />
              }
              onClick={handleVoteUp}
              disabled={hasVoteUp || hasVoteDown}
            >
              {totalVoteUp}
            </Button>
          </Tooltip>
          <Tooltip title="Vote Down" arrow>
            <Button
              sx={{ justifyContent: 'flex-start', minWidth: 0 }}
              size="small"
              startIcon={
                <ArrowCircleDownTwoToneIcon
                  sx={{ width: '20px', height: '20px' }}
                />
              }
              onClick={handleVoteDown}
              disabled={hasVoteUp || hasVoteDown}
            >
              {totalVoteDown}
            </Button>
          </Tooltip>
        </Box>

        <Tooltip title="See all 54 comments" arrow>
          <Button
            sx={{ justifyContent: 'flex-start', minWidth: 0 }}
            color="secondary"
            size="small"
            startIcon={
              <ChatBubbleTwoToneIcon sx={{ width: '15px', height: '15px' }} />
            }
          >
            {totalComments} Comments
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default ThreadListItem;
