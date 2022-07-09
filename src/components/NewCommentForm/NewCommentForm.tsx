import './NewCommentForm.scss';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewComment } from '../../react-app-env';
import { postComment } from '../../api/comments';
import {
  getCommentsSelector,
  getSelectedPostIdSelector,
} from '../../store/selectors';
import { loadComments } from '../../store';

export const NewCommentForm: React.FC = () => {
  const dispatch = useDispatch();
  const commentsList = useSelector(getCommentsSelector);
  const postId = useSelector(getSelectedPostIdSelector);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);

  const addComment = async (newComment: NewComment) => {
    if (commentsList) {
      postComment(
        newComment.name,
        newComment.email,
        newComment.body,
        newComment.postId,
      );

      dispatch(loadComments(postId));
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && email && comment && commentsList) {
      const newComment: NewComment = {
        postId,
        name,
        email,
        body: comment,
      };

      addComment(newComment);
      setError(false);
      setName('');
      setEmail('');
      setComment('');
    } else {
      setError(true);
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitHandler}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          required
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
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
      </div>
      {error && (
        <div style={{ color: 'red' }}>
          Add correct data
        </div>
      )}

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
