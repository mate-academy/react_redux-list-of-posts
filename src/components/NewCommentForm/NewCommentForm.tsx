import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './NewCommentForm.scss';
import { createComment } from '../../api/api';
import { getPostComments } from '../../api/posts';
import { GET_COMMENTS } from '../../store/commentsReducer';

type Comment = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  postId: number;
};

export const NewCommentForm: React.FC <Props> = ({ postId }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const dispatch = useDispatch();
  // const comments = useSelector((state: RootState) => state.comments.comments);

  return (
    <form
      className="NewCommentForm"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        createComment({
          postId,
          name: userName,
          email: userEmail,
          body: commentBody,
        }).then(() => {
          return getPostComments(postId);
        }).then((comms: Comment[]) => {
          dispatch({ type: GET_COMMENTS, payload: comms });
        });
        setUserName('');
        setUserEmail('');
        setCommentBody('');
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={userName}
          required
          className="NewCommentForm__input"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          required
          value={userEmail}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          required
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
