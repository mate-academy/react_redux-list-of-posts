import React, { useState } from 'react';
import './NewCommentForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, createComment } from '../../redux';

export const NewCommentForm: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setErrorMessage] = useState('');
  const postId = useSelector(selectors.getSelectedPostId);

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setErrorMessage('');
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setErrorMessage('');
  }

  function handleBody(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
    setErrorMessage('');
  }

  function submit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (name.match(/^ *$/) !== null
    || email.match(/^ *$/) !== null || body.match(/^ *$/) !== null) {
      setErrorMessage('All fields must be filled ');
    } else {
      dispatch(createComment(postId, name, email, body));
      setName('');
      setEmail('');
      setBody('');
      setErrorMessage('');
    }
  }

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(e) => handleName(e)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(e) => handleEmail(e)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(e) => handleBody(e)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={submit}
      >
        Add a comment
      </button>
      {error}
    </form>
  );
};
