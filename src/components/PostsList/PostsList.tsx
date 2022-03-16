import React, { useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const PostsList: React.FC = () => {
  const { posts, searchQuery } = useTypedSelector(state => state.posts);
  const { selectedUserId } = useTypedSelector(state => state.users);
  const { fetchPosts } = useActions();

  useEffect(() => {
    fetchPosts(selectedUserId);
  }, [selectedUserId]);

  const cardStyle = {
    minWidth: 700,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 2,
    marginBottom: 1,
  };
  const cardContentStyle = {
    display: 'flex',
    gap: 4,
  };
  const userIdStyle = {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  };
  const buttonStyle = { height: 36 };

  let visiblePosts: Post[];

  if (searchQuery.length === 0) {
    visiblePosts = [...posts];
  } else {
    visiblePosts = posts.filter(post => post.title.includes(searchQuery));
  }

  return (
    <div className="App_postslist postslist">
      {visiblePosts.map(post => (
        <Card sx={cardStyle} key={post.id}>
          <CardContent sx={cardContentStyle}>
            <Typography sx={userIdStyle}>
              {`User#${post.userId}`}
            </Typography>
            <Typography variant="body2">
              {post.title}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            sx={buttonStyle}
          >
            View more
          </Button>
        </Card>
      ))}
    </div>
  );
};
