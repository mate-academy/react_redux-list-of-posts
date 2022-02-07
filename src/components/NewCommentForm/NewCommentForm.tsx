import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createComment } from '../../api/comments';
import { State } from '../../store';
import './NewCommentForm.scss';

type Props = {
  getPostComments: () => void;
};

export const NewCommentForm: React.FC<Props> = ({ getPostComments }) => {
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const selectedPostId = useSelector((state: State) => state.selectedPostId);

  const createCommentForPost = async (event: React.FormEvent) => {
    event.preventDefault();
    await createComment(selectedPostId, name, email, body);
    getPostComments();
    setBody('');
    setEmail('');
    setName('');
  };

  return (
    <form
      onSubmit={createCommentForPost}
      className="NewCommentForm"
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          required
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
