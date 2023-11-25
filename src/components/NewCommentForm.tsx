import classNames from 'classnames';
import React, { useState } from 'react';
import * as commentsActions from '../features/comments/commentS';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const NewCommentForm = () => {
  const dispatch = useAppDispatch();
  const { submitLoading } = useAppSelector(state => state.comments);
  const { posT } = useAppSelector(state => state.posts);

  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorBody, setErrorBody] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrorName('');
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorEmail('');
  };

  const handleBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setErrorBody('');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');

    setErrorName('');
    setErrorEmail('');
    setErrorBody('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setErrorName('Name is required');
    }

    if (!email.trim()) {
      setErrorEmail('Email is required');
    }

    if (!body.trim()) {
      setErrorBody('Enter some text');
    }

    if (name.trim() && email.trim() && body.trim() && posT?.id) {
      dispatch(commentsActions.initAddComment({
        postId: posT.id as number,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      })).finally(() => setBody(''));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
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
            className={classNames('input', { 'is-danger': errorName })}
            value={name}
            onChange={handleName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
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
            className={classNames('input', { 'is-danger': errorEmail })}
            value={email}
            onChange={handleEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
            className={classNames('textarea', { 'is-danger': errorBody })}
            value={body}
            onChange={handleBody}
          />
        </div>

        {errorBody && (
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
              'is-loading': submitLoading,
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
