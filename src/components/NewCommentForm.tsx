import classNames from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { newFormSlice } from '../features/newCommentForm';
import { addComment } from '../features/comments';

export const NewCommentForm = () => {
  const dispatch = useAppDispatch();
  const { name, email, body } = useAppSelector(state => state.newForm);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const { item: selectedPost } = useAppSelector(state => state.selectedPost);

  const handleClearTwoFiledForm = () => {
    dispatch(newFormSlice.actions.clearTwoFiledForm());
  };

  const handleSubmiting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === '') {
      setErrors(error => {
        return {
          ...error,
          name: true,
        };
      });

      return;
    }

    if (email.trim() === '') {
      setErrors(error => {
        return {
          ...error,
          email: true,
        };
      });

      return;
    }

    if (body.trim() === '') {
      setErrors(error => {
        return {
          ...error,
          body: true,
        };
      });

      return;
    }

    setSubmitting(true);

    dispatch(addComment({ name, body, email, postId: selectedPost?.id }));

    setTimeout(() => {
      setSubmitting(false);
      handleClearTwoFiledForm();
    }, 300);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(error => {
      return {
        ...error,
        name: false,
      };
    });
    dispatch(newFormSlice.actions.setName(e.target.value));
  };

  const handleClearForm = () => {
    dispatch(newFormSlice.actions.clearAll());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(error => {
      return {
        ...error,
        email: false,
      };
    });
    dispatch(newFormSlice.actions.setEmail(e.target.value));
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrors(error => {
      return {
        ...error,
        body: false,
      };
    });
    dispatch(newFormSlice.actions.setBody(e.target.value));
  };

  return (
    <form
      onSubmit={handleSubmiting}
      onReset={handleClearForm}
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
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
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
            className={classNames('input', { 'is-danger': errors.email })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
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
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={body}
            onChange={handleBodyChange}
          />
        </div>

        {errors.body && (
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
