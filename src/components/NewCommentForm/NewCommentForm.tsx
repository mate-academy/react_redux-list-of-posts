import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

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
  addCommentAction,
  setInputCommentAction,
  setInputEmailAction,
  setInputNameAction,
  setIsEmailValidAction,
} from '../../store/CommentsReducer/actions';

export const NewCommentForm: FC = memo(() => {
  const dispatch = useDispatch();

  const selectedPostId = useSelector(getSelectedPostIdSelector);
  const inputName = useSelector(getInputNameSelector);
  const inputEmail = useSelector(getInputEmailSelector);
  const inputComment = useSelector(getInputCommentSelector);
  const isEmailValid = useSelector(getIsEmailValidSelector);
  const isSubmitted = useSelector(getIsSubmittedSelector);
  const isAddCommentLoading = useSelector(getIsAddCommentsLoadingSelector);

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        dispatch(addCommentAction(
          event,
          inputName,
          inputEmail,
          inputComment,
          selectedPostId,
        ));
      }}
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
        {isAddCommentLoading ? (<Loader size="small" />) : 'Add a comment'}
      </button>
    </form>
  );
});
