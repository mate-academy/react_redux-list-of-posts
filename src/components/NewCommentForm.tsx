import classNames from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addComment } from '../features/comments/commentsSlice';

type Props = {
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  // Full reset used by the Reset button
  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isNameValid = name.trim().length > 0;
    const isEmailValid = email.trim().length > 0;
    const isBodyValid = body.trim().length > 0;

    setNameError(!isNameValid);
    setEmailError(!isEmailValid);
    setBodyError(!isBodyValid);

    if (!isNameValid || !isEmailValid || !isBodyValid) {
      return;
    }

    setSubmitting(true);

    dispatch(
      addComment({
        postId,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      }),
    )
      .unwrap()
      .then(() => {
        // Only clear comment body after successful submission
        setBody('');
        setBodyError(false);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            id="comment-author-name"
            name="name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              setNameError(false);
            }}
            className={classNames('input', { 'is-danger': nameError })}
            placeholder="Name"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {nameError && (
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
            type="email"
            id="comment-author-email"
            name="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
            className={classNames('input', { 'is-danger': emailError })}
            placeholder="Email"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div className="control has-icons-right">
          <textarea
            id="comment-body"
            name="body"
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setBodyError(false);
            }}
            className={classNames('textarea', { 'is-danger': bodyError })}
            placeholder="Type comment here"
          />
          {bodyError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Comment body is required
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': submitting,
            })}
            disabled={submitting}
          >
            Add
          </button>
        </div>
        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            disabled={submitting}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
