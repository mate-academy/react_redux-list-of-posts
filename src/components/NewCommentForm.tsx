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
      <div className="NewCommentForm__form-field">
        <input
          type="text"
          required
          name="name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => dispatch(setCommentName(event.target.value))}
        />
        <span className="NewCommentForm__bar"></span>
        <label className="NewCommentForm__label">Name</label>
      </div>

      <div className="NewCommentForm__form-field">
        <input
          type="text"
          required
          name="email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => dispatch(setCommentEmail(event.target.value))}
        />
        <span className="NewCommentForm__bar"></span>
        <label className="NewCommentForm__label">Email</label>
      </div>

      <div className="NewCommentForm__form-field">
        <input
          type="text"
          required
          name="body"
          className="NewCommentForm__input"
          value={body}
          onChange={event => dispatch(setCommentBody(event.target.value))}
        />
        <span className="NewCommentForm__bar"></span>
        <label className="NewCommentForm__label">Text</label>
      </div>

      <button
        type="submit"
        className="NewCommentForm__button"
      >
        Add a comment
      </button>
    </form>
  );
};
