import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks';
import {
  fetchComentsByPostId,
  addPostComment,
} from '../../store/postDetailsSlice';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const selectPostId = useAppSelector(state => state
    .posts.selectedPostId);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      postId: selectPostId,
      name,
      email,
      body,
    };

    dispatch(addPostComment(newComment));
    dispatch(fetchComentsByPostId(selectPostId));

    setName('');
    setEmail('');
    setBody('');
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
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
