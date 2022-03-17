import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { fetchSelectedPost } from '../../helpers/api';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { PostComments } from '../PostComments';
import { useActions } from '../../hooks/useActions';

export const PostInfo: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { selectedPostId } = useTypedSelector(state => state.posts);
  const { fetchPostsComments } = useActions();

  const loadPost = async () => {
    if (selectedPostId) {
      const postFromServer = await fetchSelectedPost(selectedPostId);

      setSelectedPost(postFromServer);
    } else {
      setSelectedPost(null);
    }
  };

  useEffect(() => {
    loadPost();
  }, [selectedPostId]);

  const postInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 380,
  };

  const cardContentStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const cardTitleStyle = {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const userIdStyle = {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    mb: 1.5,
  };

  const postTitleStyle = {
    fontWeight: 'bold',
    marginBottom: 1,
  };

  const commentButtonStyle = {
    alignSelf: 'center',
  };

  return (
    <Card sx={postInfoStyle}>
      <CardContent sx={cardContentStyle}>
        <Typography sx={cardTitleStyle} gutterBottom>
          Postinfo:
        </Typography>
        {selectedPost
          ? (
            <>
              <Typography sx={userIdStyle} color="text.secondary">
                {`User#${selectedPost.userId}`}
              </Typography>
              <Typography sx={postTitleStyle} variant="body2">
                {selectedPost.title}
              </Typography>
              <Typography variant="body2">
                {selectedPost.body}
              </Typography>
              <CardActions sx={commentButtonStyle}>
                <Button
                  size="small"
                  onClick={() => {
                    fetchPostsComments(selectedPost.id);
                  }}
                >
                  Show Comments
                </Button>
              </CardActions>
              <PostComments />
            </>
          )
          : (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Click View More to see Postinfo
            </Typography>
          )}
      </CardContent>
    </Card>
  );
};
