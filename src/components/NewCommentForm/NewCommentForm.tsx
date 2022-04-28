import React, { useState } from 'react';
// eslint-disable-next-line max-len
import { addComment, getCommentsByPostId } from '../../features/comments/commentsSlice';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import './NewCommentForm.scss';

export const NewCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPostId } = useAppSelector(state => state.postReducer);

  const [comment, setComment] = useState<NewComment>({
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  });

  const { name, email, body } = comment;
  const [isFormFilled, setIsFormFilled] = useState(true);

  const handleChange = (event :React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,
    });
  };

  const validateEmail = (mail: string) => {
    return mail
      .toLowerCase()
      .match(
        // eslint-disable-next-line max-len
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() && validateEmail(email) && body.trim()) {
      setIsFormFilled(true);
      await dispatch(addComment(comment));
      await dispatch(getCommentsByPostId(selectedPostId));
      setComment({
        postId: selectedPostId,
        name: '',
        email: '',
        body: '',
      });
    } else {
      setIsFormFilled(false);
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitForm}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
      {!isFormFilled && (
        <div className="NewCommentForm__error-message">
          Filling form not completed!
        </div>
      )}
    </form>
  );
};
