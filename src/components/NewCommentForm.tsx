import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { commentsUpdate, getBodyOfComment, getEmailOfComment, getNameOfComment } from '../store';
import { setCommentBody } from '../store/bodyOfComment';
import { setCommentEmail } from '../store/emailOfComment';
import { setCommentName } from '../store/nameOfComment';

import './NewCommentForm.scss';

type NewCommentFormProps = {
  postId: number
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({ postId }) => {
  const dispatch = useDispatch();

  const name = useSelector(getNameOfComment);
  const email = useSelector(getEmailOfComment);
  const body = useSelector(getBodyOfComment);

  console.log(name)

  const handleSubmit = (event: any) => {
    event.preventDefault();

    dispatch(commentsUpdate({
      postId,
      name,
      email,
      body,
    }, postId));

    dispatch(setCommentName(''));
    dispatch(setCommentEmail(''));
    dispatch(setCommentBody(''));
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
