/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Button, Tooltip, Typography,
} from '@mui/material';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import http from '../utils/http';
import { formatDate, formatDateWithTime } from '../utils/helper';

function ThreadHeadDetail({ thread }) {
  const { id } = useParams();
  const { auth } = useSelector((state) => state);
  const [totalVoteUp, setTotalVoteUp] = React.useState(0);
  const [totalVoteDown, setTotalVoteDown] = React.useState(0);
  const [hasVoteUp, setHasVoteUp] = React.useState(false);
  const [hasVoteDown, setHasVoteDown] = React.useState(false);

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
      thread?.upVotesBy?.find((item) => item === auth?.profile?.id),
    );
    const isAlreadyVoteDown = Boolean(
      thread?.downVotesBy?.find((item) => item === auth?.profile?.id),
    );

    setTotalVoteUp(thread?.upVotesBy?.length ?? 0);
    setTotalVoteDown(thread?.downVotesBy?.length ?? 0);
    setHasVoteUp(isAlreadyVoteUp);
    setHasVoteDown(isAlreadyVoteDown);
  }, [thread]);

  return (
    <Box bgcolor="#fff" className="shadow-1" p={2} sx={{ borderRadius: '5px' }}>
      <Box display="flex" gap={2} sx={{ cursor: 'pointer' }}>
        <Box
          component="img"
          alt="profile"
          width="40px"
          height="40px"
          src={thread?.owner?.avatar}
          sx={{ borderRadius: '50%', bgcolor: 'gray' }}
        />

        <Box>
          <Typography variant="h6">{thread?.owner?.name}</Typography>
          <Box display="flex" gap={1}>
            <Tooltip title={formatDateWithTime(thread?.createdAt)} arrow>
              <Typography variant="body2">
                {formatDate(thread?.createdAt)}
              </Typography>
            </Tooltip>
            <Typography variant="body2">|</Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {thread?.category}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box mt={1}>
        <Typography variant="h5" gutterBottom>
          {thread?.title}
        </Typography>
        <Box
          sx={{ color: '#444444', fontSize: '15px' }}
          dangerouslySetInnerHTML={{ __html: thread?.body }}
        />
      </Box>
      {/* Bottom Content */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        mt={2}
      >
        {/* Vote group */}
        <Box display="flex" gap={1}>
          <Tooltip title="Vote Up" arrow>
            <Button
              sx={{ justifyContent: 'flex-start', minWidth: 0 }}
              size="small"
              startIcon={(
                <ArrowCircleUpTwoToneIcon
                  sx={{ width: '20px', height: '20px' }}
                />
              )}
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
              startIcon={(
                <ArrowCircleDownTwoToneIcon
                  sx={{ width: '20px', height: '20px' }}
                />
              )}
              onClick={handleVoteDown}
              disabled={hasVoteUp || hasVoteDown}
            >
              {totalVoteDown}
            </Button>
          </Tooltip>
        </Box>

        <Tooltip title="Add comment" arrow>
          <Button
            sx={{ justifyContent: 'flex-start', minWidth: 0 }}
            color="secondary"
            size="small"
            startIcon={
              <ChatBubbleTwoToneIcon sx={{ width: '15px', height: '15px' }} />
            }
          >
            {thread?.comments?.length ?? 0}
            {' '}
            Comments
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default ThreadHeadDetail;
