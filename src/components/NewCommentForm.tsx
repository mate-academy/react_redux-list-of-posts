import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { commentsUpdate } from '../store';
import { resetComment, setCommentBody, setCommentEmail, setCommentName } from '../store/resetComment';
import { getBodyOfComment, getEmailOfComment, getNameOfComment } from '../store/selectors';

import './NewCommentForm.scss';

type NewCommentFormProps = {
  postId: number
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({ postId }) => {
  const dispatch = useDispatch();
  const name = useSelector(getNameOfComment);
  const email = useSelector(getEmailOfComment);
  const body = useSelector(getBodyOfComment);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    dispatch(commentsUpdate({
      postId,
      name,
      email,
      body,
    }, postId));

    dispatch(resetComment());
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => dispatch(setCommentName(event.target.value))}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => dispatch(setCommentEmail(event.target.value))}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={event => dispatch(setCommentBody(event.target.value))}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
