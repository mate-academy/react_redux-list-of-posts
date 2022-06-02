import React, { ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

import { selectors, actions } from '../../store/main';
import { selectorsForm, actionsForm } from '../../store/form';

export const NewCommentForm: React.FC = () => {
  const userName = useSelector(selectorsForm.userNameSelector);
  const userEmail = useSelector(selectorsForm.userEmailSelector);
  const newComment = useSelector(selectorsForm.newCommentSelector);
  const userError = useSelector(selectorsForm.userErrorSelector);
  const emailError = useSelector(selectorsForm.emailErrorSelector);
  const commentError = useSelector(selectorsForm.commentErrorSelector);

  const postId = useSelector(selectors.getPostIdSelector);

  const dispatch = useDispatch();

  const addInfo = (event:
  ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    switch (name) {
      case 'name':
        dispatch(actionsForm.addUserName(value));
        dispatch(actionsForm.getUserError(null));
        break;

      case 'email':
        dispatch(actionsForm.addUserEmail(value));
        dispatch(actionsForm.getEmailError(null));
        break;

      case 'body':
        dispatch(actionsForm.createComment(value));
        dispatch(actionsForm.getCommentError(null));
        break;

      default:
        throw new Error('error');
    }
  };

  const validate = () => {
    if (!userName.trim()) {
      dispatch(actionsForm.getUserError('Please enter your name'));

      return false;
    }

    if (!userEmail.trim()) {
      dispatch(actionsForm.getEmailError('Please enter your email'));

      return false;
    }

    if (!newComment.trim()) {
      dispatch(actionsForm.getCommentError('Please enter your comment'));

      return false;
    }

    return true;
  };

  const postNewComment = async () => {
    const commentForCreate = {
      postId,
      name: userName,
      email: userEmail,
      body: newComment,
    };

    const result = await addComment(commentForCreate);

    dispatch(actions.addComment(result));
  };

  const submitForm = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      postNewComment();

      dispatch(actionsForm.addUserName(''));
      dispatch(actionsForm.addUserEmail(''));
      dispatch(actionsForm.createComment(''));
      dispatch(actionsForm.getUserError(null));
      dispatch(actionsForm.getEmailError(null));
      dispatch(actionsForm.getCommentError(null));
    }
  };

  return (
    <form className="NewCommentForm" onSubmit={submitForm}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={userName}
          onChange={addInfo}
        />
      </div>
      {userError && <p className="Form__error">{userError}</p>}

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={userEmail}
          onChange={addInfo}
          required
        />
      </div>
      {emailError && <p className="Form__error">{emailError}</p>}

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newComment}
          onChange={addInfo}
        />
      </div>
      {commentError && <p className="Form__error">{commentError}</p>}

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
