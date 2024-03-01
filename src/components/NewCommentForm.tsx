import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setNewComment,
  setNewCommentBody,
  setNewCommentEmail,
  setNewCommentErrors,
  setNewCommentName,
} from '../features/newCommentFormSlice';
import { addCommentAsync } from '../features/commentsSlice';

export const NewCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    newComment,
    hasError,
    loaded,
  } = useAppSelector(state => state.newComment);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const clearForm = () => {
    dispatch(setNewComment({
      name: '',
      email: '',
      body: '',
    }));

    dispatch(setNewCommentErrors({
      name: false,
      email: false,
      body: false,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const normalizedName = newComment.name.trim();
    const normalizedMail = newComment.email.trim();
    const normalizedBody = newComment.body.trim();

    const normalizedNewComment = {
      name: normalizedName,
      email: normalizedMail,
      body: normalizedBody,
    };

    if (!normalizedName
    || !normalizedBody
    || !normalizedMail
    ) {
      dispatch(setNewCommentErrors({
        name: !normalizedName,
        email: !normalizedMail,
        body: !normalizedBody,
      }));

      dispatch(setNewComment(normalizedNewComment));
    }

    if (normalizedName
      && normalizedBody
      && normalizedMail
      && selectedPost) {
      const newComm = {
        ...normalizedNewComment,
        postId: selectedPost.id,
      };

      dispatch(addCommentAsync(newComm));
    }
  };

  const handleChangeName = (event: string) => {
    dispatch(setNewCommentName(event));
    dispatch(setNewCommentErrors({
      ...hasError,
      name: false,
    }));
  };

  const handleChangeBody = (event: string) => {
    dispatch(setNewCommentBody(event));
    dispatch(setNewCommentErrors({
      ...hasError,
      body: false,
    }));
  };

  const handleChangeMail = (event: string) => {
    dispatch(setNewCommentEmail(event));
    dispatch(setNewCommentErrors({
      ...hasError,
      email: false,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={clearForm}
      data-cy="NewCommentForm"
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': hasError.name })}
            value={newComment.name}
            onChange={event => handleChangeName(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasError.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasError.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': hasError.email })}
            value={newComment.email}
            onChange={event => handleChangeMail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasError.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasError.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': hasError.body })}
            value={newComment.body}
            onChange={event => handleChangeBody(event.target.value)}
          />
        </div>

        {hasError.body && (
          <p
            className="help is-danger"
            data-cy="ErrorMessage"
          >
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': loaded,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
