import React, { useState } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';

interface Props {
  postId: number;
  onSubmit: (comment: Omit<Comment, 'id'>) => Promise<void>;
}

export const NewCommentForm: React.FC<Props> = ({ postId, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Очищення ВСІХ полів (для кнопки Clear / Reset)
  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isNameValid = name.trim().length > 0;
    const isEmailValid = email.trim().length > 0 && email.includes('@');
    const isBodyValid = body.trim().length > 0;

    setNameError(!isNameValid);
    setEmailError(!isEmailValid);
    setBodyError(!isBodyValid);

    if (!isNameValid || !isEmailValid || !isBodyValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        postId,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      });

      // ✅ Після успішної відправки очищаємо ТІЛЬКИ body
      setBody('');
      setNameError(false);
      setEmailError(false);
      setBodyError(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      data-cy="NewCommentForm"
    >
      {/* Field: Name */}
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div
          className={classNames('control', 'has-icons-left', {
            'has-icons-right': nameError,
          })}
        >
          <input
            type="text"
            id="comment-author-name"
            name="name"
            className={classNames('input', { 'is-danger': nameError })}
            placeholder="Name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              setNameError(false);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {nameError && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
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

      {/* Field: Email */}
      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>
        <div
          className={classNames('control', 'has-icons-left', {
            'has-icons-right': emailError,
          })}
        >
          <input
            type="email"
            id="comment-author-email"
            name="email"
            className={classNames('input', { 'is-danger': emailError })}
            placeholder="Email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {emailError && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
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

      {/* Field: Body */}
      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div
          className={classNames('control', {
            'has-icons-right': bodyError,
          })}
        >
          <textarea
            id="comment-body"
            name="body"
            className={classNames('textarea', { 'is-danger': bodyError })}
            placeholder="Write your comment..."
            value={body}
            onChange={e => {
              setBody(e.target.value);
              setBodyError(false);
            }}
          />
          {bodyError && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Body is required
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isSubmitting,
            })}
            disabled={isSubmitting}
            data-cy="SubmitButton"
          >
            Add Comment
          </button>
        </div>
        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
