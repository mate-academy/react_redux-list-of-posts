import React, { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../app/hooks';
import { addComment } from '../features/comments';
import { createComment } from '../api/comments';

type Props = {
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clearErrors = () => {
    setNameError(false);
    setEmailError(false);
    setBodyError(false);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    clearErrors();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isNameInvalid = !name.trim();
    const isEmailInvalid = !email.trim();
    const isBodyInvalid = !body.trim();

    setNameError(isNameInvalid);
    setEmailError(isEmailInvalid);
    setBodyError(isBodyInvalid);

    if (isNameInvalid || isEmailInvalid || isBodyInvalid) {
      return;
    }

    setIsLoading(true);

    createComment({
      postId,
      name,
      email,
      body,
    })
      .then(newComment => {
        dispatch(addComment(newComment));
        setBody('');
        clearErrors();
      })
      .finally(() => {
        setIsLoading(false);
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
            id="comment-author-name"
            name="name"
            type="text"
            className={classNames('input', {
              'is-danger': nameError,
            })}
            placeholder="Name Surname"
            value={name}
            onChange={event => {
              setName(event.target.value);
              setNameError(false);
            }}
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
            id="comment-author-email"
            name="email"
            type="text"
            className={classNames('input', {
              'is-danger': emailError,
            })}
            placeholder="Your email"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setEmailError(false);
            }}
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
          Write a comment
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            className={classNames('textarea', {
              'is-danger': bodyError,
            })}
            placeholder="Type your comment here..."
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setBodyError(false);
            }}
          />
        </div>
        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>
        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
