import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/comments';

export const NewCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { values, valuesError, submitting } = useAppSelector(
    state => state.comments,
  );

  const { selectedPost } = useAppSelector(state => state.posts);

  const { name, email, body } = values;
  const { email: emailError, body: bodyError, name: nameError } = valuesError;

  const id = selectedPost?.id;

  const clearForm = () => {
    dispatch(commentsActions.actions.clear());
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    dispatch(commentsActions.actions.setValue({ ...values, [field]: value }));
    dispatch(
      commentsActions.actions.setError({ ...valuesError, [field]: false }),
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isNameError = !name;
    const isEmailError = !email;
    const isbodyError = !body;

    dispatch(
      commentsActions.actions.setError({
        name: isNameError,
        email: isEmailError,
        body: isbodyError,
      }),
    );

    if (isNameError || isEmailError || isbodyError) {
      return;
    }

    dispatch(
      commentsActions.addComment({
        name,
        email,
        body,
        postId: id as number,
      }),
    );

    dispatch(commentsActions.actions.setValue({ ...values, body: '' }));
  };

  return (
    <form onSubmit={handleSubmit} onReset={clearForm} data-cy="NewCommentForm">
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
              'is-loading': submitting,
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
