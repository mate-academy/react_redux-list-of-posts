/* eslint-disable no-console */
import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { NewComment } from '../../react-app-env';
import { addComment } from '../../api/comment';
import './NewCommentForm.scss';
import { getSelectedPostIdSelector } from '../../store/selectors';

interface Props {
  commentsGetter: () => void,
}

export const NewCommentForm: React.FC<Props> = ({ commentsGetter }) => {
  const selectedPostId = useSelector(getSelectedPostIdSelector);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const submitter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment: NewComment = {
      postId: selectedPostId,
      name,
      email,
      body,
    };

    try {
      await addComment(newComment);
    } catch (error) {
      console.log(error);
    }

    commentsGetter();
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitter}
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
          type="email"
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
