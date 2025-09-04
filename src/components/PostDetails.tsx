import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchComments, clearComments } from '../features/commentSlice';
// import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

interface PostDetailsProps {
  postId: number;
  onClose: () => void;
}

export const PostDetails: FC<PostDetailsProps> = ({ postId, onClose }) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.items);
  const post = posts.find(p => p.id === postId);

  const commentsState = useAppSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchComments(postId));

    return () => {
      dispatch(clearComments());
    };
  }, [dispatch, postId]);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div
      style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px' }}
    >
      <button onClick={onClose} style={{ float: 'right', cursor: 'pointer' }}>
        Close
      </button>
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <section style={{ marginTop: '20px' }}>
        <h4>Comments</h4>
        {commentsState.hasError && (
          <p style={{ color: 'red' }}>Error loading comments</p>
        )}
        {!commentsState.loaded && !commentsState.hasError && (
          <p>Loading comments...</p>
        )}
        {commentsState.loaded && commentsState.items.length === 0 && (
          <p>No comments yet</p>
        )}
        <ul>
          {commentsState.items.map((comment: Comment) => (
            <li key={comment.id} style={{ marginBottom: '10px' }}>
              <strong>{comment.name}</strong> ({comment.email})
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: '20px' }}>
        <NewCommentForm postId={postId} />
      </section>
    </div>
  );
};
