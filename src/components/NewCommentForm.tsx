import { useState } from 'react';

import { createComment } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  onAddComment: (comment: Comment) => void;
};

export const NewCommentForm = ({
  postId,
  onAddComment,
}: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    setIsLoading(true);
    setError(false);

    try {
      const newComment = await createComment({
        postId,
        name,
        email,
        body,
      });

      onAddComment(newComment);

      setName('');
      setEmail('');
      setBody('');
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <h2>
        Add a comment
      </h2>

      {error && (
        <p>
          Unable to add a comment
        </p>
      )}

      <input
        data-cy="NewCommentName"
        type="text"
        placeholder="Name"
        value={name}
        onChange={event => setName(event.target.value)}
        disabled={isLoading}
      />

      <input
        data-cy="NewCommentEmail"
        type="email"
        placeholder="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        disabled={isLoading}
      />

      <textarea
        data-cy="NewCommentBody"
        placeholder="Comment"
        value={body}
        onChange={event => setBody(event.target.value)}
        disabled={isLoading}
      />

      <button
        type="submit"
        data-cy="NewCommentSubmit"
        disabled={
          isLoading
          || !name
          || !email
          || !body
        }
      >
        {isLoading ? 'Adding...' : 'Add comment'}
      </button>
    </form>
  );
};
