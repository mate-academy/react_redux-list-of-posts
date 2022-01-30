import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentCreate } from '../../redux/actions';
import './NewComment.scss';

type Props = {
  postQuery: string
};

export const NewComment: React.FC<Props> = ({ postQuery }) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const newComment = {
      postId: +postQuery,
      name,
      email,
      body,
    };

    if (name.trim() && email.trim() && body.trim()) {
      dispatch(commentCreate(newComment));
    } else {
      setError(true);
    }

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleFormSubmit}
    >
      <label
        htmlFor="name"
        className="NewCommentForm__label"
      >
        <input
          className="NewCommentForm__input"
          type="text"
          id="name"
          value={name}
          placeholder="Your name"
          required
          onChange={({ target }) => setName(target.value)}
        />
      </label>
      <label
        className="NewCommentForm__label"
        htmlFor="email"
      >
        <input
          className="NewCommentForm__input"
          type="email"
          id="email"
          value={email}
          placeholder="Your email"
          required
          onChange={({ target }) => setEmail(target.value)}
        />
      </label>
      <label
        className="NewCommentForm__label"
        htmlFor="texterea"
      >
        <textarea
          id="texterea"
          className="NewCommentForm__input"
          value={body}
          required
          placeholder="Type your comment"
          onChange={({ target }) => setBody(target.value)}
        />
      </label>
      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add new comment
      </button>
      {error && (
        <p>Please fill in all input forms</p>
      )}
    </form>
  );
};
