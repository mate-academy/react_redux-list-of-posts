import classNames from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CommentData } from '../types/Comment';
import { addComment } from '../features/comment';

export const NewCommentForm: React.FC = () => {
  const [{ nameError, emailError, bodyError }, setError] = useState({
    nameError: false,
    emailError: false,
    bodyError: false,
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useAppDispatch();
  const { submiting } = useAppSelector(state => state.comments);
  const { selectedPost } = useAppSelector(state => state.posts);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(current => ({ ...current, nameError: false }));
    setName(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(current => ({ ...current, emailError: false }));
    setEmail(event.target.value);
  };

  const handleBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(current => ({ ...current, bodyError: false }));
    setBody(event.target.value);
  };

  const clearForm = () => {
    setBody('');
    setError({
      nameError: false,
      emailError: false,
      bodyError: false,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name && !email && !body) {
      setError({
        nameError: true,
        emailError: true,
        bodyError: true,
      });

      return;
    }

    if (name === '') {
      setError(current => ({ ...current, nameError: true }));

      return;
    }

    if (email === '') {
      setError(current => ({ ...current, emailError: true }));

      return;
    }

    if (body === '') {
      setError(current => ({ ...current, bodyError: true }));

      return;
    }

    const newComment: CommentData = {
      name,
      email,
      body,
      postId: selectedPost!.id!,
    };

    await dispatch(addComment(newComment));
    clearForm();
  };

  return (
    <form onSubmit={onSubmit} onReset={clearForm} data-cy="NewCommentForm">
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleName}
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
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleEmail}
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

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={handleBody}
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
            className={classNames('button', 'is-link', {
              'is-loading': submiting,
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
