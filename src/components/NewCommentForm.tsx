import { useState } from 'react';
import { Comment } from '../types/Comment';

interface NewCommentFormProps {
  postId: number;
  onAddComment: (comment: Comment) => void;
}

export const NewCommentForm = ({
  postId,
  onAddComment,
}: NewCommentFormProps) => {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newComment: Comment = {
      postId,
      id: Date.now(),
      name,
      body,
      email: 'user@example.com', // przykładowe pole wymagane przez typ Comment
    };

    // tu możesz dodać faktyczne wywołanie API, np. fetch POST
    onAddComment(newComment);

    setName('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Comment"
        value={body}
        onChange={e => setBody(e.target.value)}
        required
      />
      <br />
      <button type="submit">Add Comment</button>
    </form>
  );
};
