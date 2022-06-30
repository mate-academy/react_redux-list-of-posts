import './NewCommentForm.scss';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getNeedToUpdate, getPostIdSelector } from '../../store/selectors';
import { setNeedToUpdate } from '../../store/actions';
import { postComment } from '../../api/api';

export const NewCommentForm: React.FC = () => {
  const needToUpdate = useSelector(getNeedToUpdate);
  const postId = useSelector(getPostIdSelector);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        if (postId !== null) {
          postComment(name, email, commentBody, postId);
        }

        setNeedToUpdate(!needToUpdate);
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          className="NewCommentForm__input"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          value={email}
          className="NewCommentForm__input"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={commentBody}
          className="NewCommentForm__input"
          onChange={(event) => {
            setCommentBody(event.target.value);
          }}
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
