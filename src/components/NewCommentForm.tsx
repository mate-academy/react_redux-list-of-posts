import cn from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as formActions from '../features/formSlice';
import * as commentActions from '../features/commentsSlice';

export const NewCommentForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const postId = useAppSelector(state => state.posts.selectedPost?.id);

  const { nameError, emailError, bodyError, name, email, body } =
    useAppSelector(state => state.form);

  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    if (field === 'name' || field === 'email' || field === 'body') {
      dispatch(formActions.setField({ field, value }));
    }
  };

  const handleReset = () => {
    dispatch(formActions.clear());
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!postId) {
      return;
    }

    dispatch(formActions.validateField());

    if (!name || !email || !body) {
      return;
    }

    setSubmitting(true);

    await dispatch(commentActions.addComment({ name, email, body, postId }));

    setSubmitting(false);
    dispatch(formActions.setField({ field: 'body', value: '' }));
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
            className={cn('input', { 'is-danger': nameError })}
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
            className={cn('input', { 'is-danger': emailError })}
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
            className={cn('textarea', { 'is-danger': bodyError })}
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
            className={cn('button', 'is-link', {
              'is-loading': submitting,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
