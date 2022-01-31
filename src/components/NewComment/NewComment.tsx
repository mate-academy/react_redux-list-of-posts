import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentCreate } from '../../redux/actions';
import './NewComment.scss';

type Props = {
  postQuery: string,
};

export const NewComment: React.FC<Props> = ({ postQuery }) => {
  const [error, setError] = useState(false);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    body: '',
    postId: +postQuery,
  });

  const reset = () => {
    setNewComment({
      name: '',
      email: '',
      body: '',
      postId: +postQuery,
    });
  };

  const { name, email, body } = newComment;

  const dispatch = useDispatch();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    if (name.trim() && email.trim() && body.trim()) {
      dispatch(commentCreate(newComment));
    } else {
      setError(true);
    }

    reset();
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
          onChange={({ target }) => setNewComment({
            ...newComment,
            name: target.value,
          })}
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
          onChange={({ target }) => setNewComment({
            ...newComment,
            email: target.value,
          })}
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
          onChange={({ target }) => setNewComment({
            ...newComment,
            body: target.value,
          })}
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
