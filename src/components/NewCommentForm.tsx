import React, { useState } from 'react';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  onSubmit: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      id: 0, // Temporary ID (will be replaced by the backend)
      postId, // Use the passed postId
      name,
      email,
      body,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
