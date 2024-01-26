/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import http from '../utils/http';
import { formatDate, formatDateWithTime } from '../utils/helper';

function CommentListItem({ item }) {
  const { id } = useParams();
  const {
    createdAt = '',
    content = 'Comment not found',
    upVotesBy = [],
    downVotesBy = [],
    owner: {
      avatar = 'https://picsum.photos/200',
      name: ownerName = 'Name not found',
    } = {},
  } = item;
  const { profile } = useSelector((state) => state.auth);
  const [totalVoteUp, setTotalVoteUp] = React.useState(0);
  const [totalVoteDown, setTotalVoteDown] = React.useState(0);
  const [hasVoteUp, setHasVoteUp] = React.useState(false);
  const [hasVoteDown, setHasVoteDown] = React.useState(false);

  const handleVoteUp = async () => {
    try {
      // check if not yet vote up
      if (!hasVoteUp) {
        setTotalVoteUp((prev) => prev + 1);
        await http.post(`/threads/${id}/comments/${item?.id}/up-vote`, {
          voteType: 1,
        });
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
        await http.post(`/threads/${id}/comments/${item?.id}/down-vote`, {
          voteType: -1,
        });
        setHasVoteDown(true);
      } else {
        setHasVoteDown(true);
      }
    } catch (error) {
      setHasVoteUp(true);
    }
  };

  React.useEffect(() => {
    const isAlreadyVoteUp = Boolean(
      item?.upVotesBy?.find((child) => child === profile?.id),
    );
    const isAlreadyVoteDown = Boolean(
      item?.downVotesBy?.find((child) => child === profile?.id),
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
      my={3}
      sx={{ borderRadius: '5px' }}
    >
      <Box display="flex" gap={2} sx={{ cursor: 'pointer' }}>
        <Box
          component="img"
          alt="profile"
          width="40px"
          height="40px"
          src={avatar}
          sx={{ borderRadius: '50%', bgcolor: 'gray' }}
        />

        <Box>
          <Typography variant="h6">{ownerName}</Typography>
          <Tooltip title={formatDateWithTime(createdAt)} arrow>
            <Typography variant="body2">{formatDate(createdAt)}</Typography>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{ color: '#444444', fontSize: '15px', mt: 1.5 }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {/* Bottom Content */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        mt={2}
      >
        {/* Vote group */}
        <Box display="flex" gap={1}>
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
      </Box>
    </Box>
  );
}

export default CommentListItem;
