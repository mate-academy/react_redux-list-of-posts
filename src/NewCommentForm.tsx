import { useState } from 'react';
import { addNewComment } from './commentsSlice';
import { useAppDispatch } from './hooks';

export const NewCommentForm = ({ postId }: { postId: number }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(addNewComment({ postId, email, body }));

    setEmail('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <textarea
        value={body}
        placeholder="Comment"
        onChange={e => setBody(e.target.value)}
      />

      <button type="submit">Add comment</button>
    </form>
  );
};
