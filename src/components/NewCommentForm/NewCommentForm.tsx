import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCommentsFromServer } from '../../store/index';
import './NewCommentForm.scss';
import { postComment } from '../../api/comments';

export const NewCommentForm: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPostId = useSelector((state: PostsState) => state.postsListSlice.selectedPostId);
  const [nameForComment, setNameForComment] = useState<string>('');
  const [emailForComment, setEmailForComment] = useState<string>('');
  const [bodyForComment, setBodyForComment] = useState<string>('');

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameForComment(event.target.value);
  };

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailForComment(event.target.value);
  };

  const handleBodyInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyForComment(event.target.value);
  };

  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    await postComment(
      selectedPostId,
      nameForComment,
      emailForComment,
      bodyForComment,
    );
    setNameForComment('');
    setEmailForComment('');
    setBodyForComment('');

    dispatch(getCommentsFromServer(selectedPostId));
  };

  return (
    <form className="NewCommentForm" onSubmit={handleAddComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={nameForComment}
          onChange={handleNameInput}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={emailForComment}
          onChange={handleEmailInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={bodyForComment}
          onChange={handleBodyInput}
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
