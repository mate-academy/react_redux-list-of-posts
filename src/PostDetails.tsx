/* eslint-disable curly */
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { removeComment } from './commentsSlice';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch } from './hooks';
import { useState } from 'react';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const postId = useSelector((s: RootState) => s.selectedPost);

  const { items } = useSelector((s: RootState) => s.comments);
  const [visible, setVisible] = useState<boolean>(false);
  const posts = useSelector((s: RootState) => s.posts.items);
  const post = posts.find(p => p.id === postId);

  if (!post) return <p>Select a post...</p>;

  return (
    <div style={{ border: '1px solid gray', padding: '1rem' }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <NewCommentForm postId={postId} />

      <button onClick={() => setVisible(prev => !prev)}>
        {visible ? 'Hide comments' : 'Show comments'}
      </button>

      {visible && (
        <ul>
          {items.map(c => (
            <li key={c.id}>
              <strong>{c.email}:</strong> {c.body}
              <button onClick={() => dispatch(removeComment(c.id))}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
