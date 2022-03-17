import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const PostComments: React.FC = () => {
  const { postComments } = useTypedSelector(state => state.postComments);

  const cardStyle = {
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

  return (
    <div className="Post-Info__Post-comments">
      {postComments.map(postComment => (
        <Card sx={cardStyle} key={postComment.id}>
          <CardContent sx={cardContentStyle}>
            <Typography variant="body2">
              {postComment.body}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
