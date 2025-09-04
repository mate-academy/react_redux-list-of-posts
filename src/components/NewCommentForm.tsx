import { FC, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addComment } from '../features/commentSlice';
import { Comment } from '../types/Comment';

interface NewCommentFormProps {
  postId: number;
}

export const NewCommentForm: FC<NewCommentFormProps> = ({ postId }) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !body) {
      setError('All fields are required');

      return;
    }

    setError('');

    // Tworzymy nowy komentarz lokalnie
    const newComment: Comment = {
      postId,
      id: Date.now(), // tymczasowe ID dla UI
      name,
      email,
      body,
    };

    // Optimistic update – od razu dodajemy do store
    dispatch(addComment(newComment));

    // Wywołanie API (opcjonalne) – można tu użyć fetch/post do backendu
    // await fetch(`https://jsonplaceholder.typicode.com/comments`, {
    //   method: 'POST',
    //   body: JSON.stringify(newComment),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // Reset formularza
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
      <h5>Add a new comment</h5>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ display: 'block', marginBottom: '5px', width: '100%' }}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: 'block', marginBottom: '5px', width: '100%' }}
        />
      </div>
      <div>
        <textarea
          placeholder="Comment"
          value={body}
          onChange={e => setBody(e.target.value)}
          style={{ display: 'block', marginBottom: '5px', width: '100%' }}
        />
      </div>
      <button type="submit" style={{ cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
};
