import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchComments, addComment } from '../features/commentSlice';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

interface PostDetailsProps {
  postId: number;
}

export const PostDetails = ({ postId }: PostDetailsProps) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleAddComment = (comment: Comment) => {
    dispatch(addComment(comment));
  };

  if (!visible) return null;

  return (
    <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
      <button onClick={() => setVisible(false)}>Close</button>

      {comments.hasError && <p style={{ color: 'red' }}>Error loading comments</p>}
      {!comments.loaded && <p>Loading comments...</p>}

      {comments.loaded && (
        <>
          <h3>Comments</h3>
          <ul>
            {comments.items.map(comment => (
              <li key={comment.id}>
                <strong>{comment.name}:</strong> {comment.body}
              </li>
            ))}
          </ul>
          <NewCommentForm postId={postId} onAddComment={handleAddComment} />
        </>
      )}
    </div>
  );
};
