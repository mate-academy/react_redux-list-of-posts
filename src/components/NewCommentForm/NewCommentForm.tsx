import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPostComments } from '../../api/api';
import { NewComment } from '../../react-app-env';
import { setComments } from '../../store';
import {
  getCurrentPostIdSelector,
} from '../../store/selectors';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();
  const currentPostID = useSelector(getCurrentPostIdSelector);

  const clearInputs = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newComment: NewComment = {
      name,
      email,
      body,
      postId: +currentPostID,
    };

    await addComment(newComment);
    const commentsToPost = await getPostComments(+currentPostID);

    dispatch(setComments(commentsToPost));
    clearInputs();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleFormSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={({ target }) => {
            setBody(target.value);
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
