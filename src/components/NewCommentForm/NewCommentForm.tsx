/* eslint-disable no-console */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Comment } from '../../types/Comment';

import { addComment } from '../../api/comments';
import { emailValidator } from '../../functions/emailValidator';

import './NewCommentForm.scss';

import { Loader } from '../Loader';

import { getSelectedPostIdSelector } from '../../store/PostsReducer/selectors';
import {
  getInputCommentSelector,
  getInputEmailSelector,
  getInputNameSelector,
  getIsAddCommentsLoadingSelector,
  getIsEmailValidSelector,
  getIsSubmittedSelector,
} from '../../store/CommentsReducer/selectors';
import {
  setInputCommentAction,
  setInputEmailAction,
  setInputNameAction,
  setIsAddCommentLoadingAction, setIsEmailValidAction, setIsSubmittedAction,
} from '../../store/CommentsReducer/actions';

type Props = {
  getComments: () => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  getComments,
}) => {
  const dispatch = useDispatch();

  const postId = useSelector(getSelectedPostIdSelector);
  const inputName = useSelector(getInputNameSelector);
  const inputEmail = useSelector(getInputEmailSelector);
  const inputComment = useSelector(getInputCommentSelector);
  const isEmailValid = useSelector(getIsEmailValidSelector);
  const isSubmitted = useSelector(getIsSubmittedSelector);
  const isAddCommentLoading = useSelector(getIsAddCommentsLoadingSelector);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(setIsAddCommentLoadingAction(true));
      dispatch(setIsSubmittedAction(true));

      if (!inputName || !inputEmail || !inputComment) {
        dispatch(setIsAddCommentLoadingAction(false));

        return;
      }

      if (!emailValidator(inputEmail)) {
        dispatch(setIsEmailValidAction(false));
        dispatch(setIsAddCommentLoadingAction(false));

        return;
      }

      const newComment: Omit<Comment, 'id'> = {
        postId: postId || 0,
        name: inputName,
        email: inputEmail,
        body: inputComment,
      };

      await addComment(newComment);
      await getComments();

      dispatch(setIsSubmittedAction(false));
      dispatch(setIsAddCommentLoadingAction(false));
      dispatch(setInputNameAction(''));
      dispatch(setInputEmailAction(''));
      dispatch(setInputCommentAction(''));
    },
    [inputName, inputEmail, inputComment, postId],
  );

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={inputName}
          onChange={({ target }) => {
            dispatch(setInputNameAction(target.value));
          }}
        />
      </div>

      <div className="form-field">
        {!isEmailValid && (
          <p className="NewCommentForm__emailError">
            Email is invalid
          </p>
        )}

        <input
          type="text"
          name="email"
          placeholder="Your email"
          className={classNames(
            'NewCommentForm__input',
            { 'NewCommentForm__input--invalid': !isEmailValid },
          )}
          value={inputEmail}
          onChange={({ target }) => {
            if (isSubmitted) {
              if (inputEmail !== target.value) {
                dispatch(setIsEmailValidAction(true));
              }
            }

            dispatch(setInputEmailAction(target.value));
          }}
          onBlur={({ target }) => {
            if (isSubmitted) {
              dispatch(setIsEmailValidAction(emailValidator(target.value)));
            }
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={inputComment}
          onChange={({ target }) => {
            dispatch(setInputCommentAction(target.value));
          }}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        disabled={isAddCommentLoading}
      >
        {isAddCommentLoading ? (<Loader />) : 'Add a comment'}
      </button>
    </form>
  );
});
