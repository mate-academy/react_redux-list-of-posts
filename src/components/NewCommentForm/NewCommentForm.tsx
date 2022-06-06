import {
  FC,
  memo,
  ChangeEvent,
  useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks/redux';
import { commentSlice } from '../../store/reducers/CommentSlice';
import { createComment } from '../../store/reducers/ActionCreators';
import { ErrorMessage } from '../ErrorMessage';
import './NewCommentForm.scss';

enum InputNames {
  name = 'name',
  email = 'email',
  body = 'body',
}

enum InputError {
  nameError = 'Please enter a name',
  emailError = 'Please enter email',
  bodyError = 'Please enter a comment',
}

export const NewCommentForm: FC = memo(() => {
  const {
    commentBody,
    commentUserEmail,
    commentUserName,
    hasBodyError,
    hasNameError,
    hasEmailError,
  } = useAppSelector(state => state.commentReducer);

  const { currentPostId } = useAppSelector(state => state.postsReducer);

  const {
    setUserName,
    setUserEmail,
    setBody,
    isBodyError,
    isEmailError,
    isNameError,
    setErrorMessage,
  } = commentSlice.actions;

  const { email, name, body } = InputNames;
  const { nameError, emailError, bodyError } = InputError;

  const dispatch = useDispatch();

  const handleChange = useCallback((
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    setValue,
  ) => {
    const { value } = event.target;

    switch (setValue) {
      case name:
        return dispatch(setUserName(value));

      case email:
        return dispatch(setUserEmail(value));

      case body:
        return dispatch(setBody(value));

      default:
        return value;
    }
  }, []);

  const validate = useCallback((param) => {
    if (param.trim().length) {
      return true;
    }

    switch (param) {
      case commentUserName:
        dispatch(isNameError());
        dispatch(setErrorMessage(nameError));
        break;

      case commentUserEmail:
        dispatch(isEmailError());
        dispatch(setErrorMessage(emailError));
        break;

      case commentBody:
        dispatch(isBodyError());
        dispatch(setErrorMessage(bodyError));
        break;

      default:
        break;
    }

    return false;
  }, [commentUserName, commentBody, commentUserEmail]);

  const onAdd = useCallback((event) => {
    event.preventDefault();
    const isNameValid = validate(commentUserName);
    const isEmailValid = validate(commentUserEmail);
    const isBodyValid = validate(commentBody);

    if (isNameValid && isEmailValid && isBodyValid) {
      const newComment = {
        postId: currentPostId,
        name: commentUserName.trim(),
        email: commentUserEmail.trim(),
        body: commentBody.trim(),
      };

      dispatch(createComment(newComment, currentPostId));
    }
  }, [currentPostId, commentUserName, commentUserEmail, commentBody]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={onAdd}
    >
      <div className="form-field">
        <input
          type="text"
          name={name}
          value={commentUserName}
          onChange={(event) => handleChange(event, name)}
          placeholder="Your name"
          className="NewCommentForm__input"
        />

        {hasNameError && <ErrorMessage />}
      </div>

      <div className="form-field">
        <input
          type="email"
          name={email}
          value={commentUserEmail}
          onChange={(event) => handleChange(event, email)}
          placeholder="Your email"
          className="NewCommentForm__input"
        />

        {hasEmailError && <ErrorMessage />}
      </div>

      <div className="form-field">
        <textarea
          name={body}
          value={commentBody}
          onChange={(event) => handleChange(event, body)}
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />

        {hasBodyError && <ErrorMessage />}
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
});
