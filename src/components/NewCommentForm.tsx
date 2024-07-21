import React, { memo, useState } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../app/hooks';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = memo(
  function NewCommentFormComponent({ onSubmit }) {
    const { submitting } = useAppSelector(state => state.comments);

    const [errors, setErrors] = useState({
      name: false,
      email: false,
      body: false,
    });

    const [{ name, email, body }, setValues] = useState({
      name: '',
      email: '',
      body: '',
    });

    const clearForm = () => {
      setValues({
        name: '',
        email: '',
        body: '',
      });

      setErrors({
        name: false,
        email: false,
        body: false,
      });
    };

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name: field, value } = event.target;

      setValues(current => ({ ...current, [field]: value }));
      setErrors(current => ({ ...current, [field]: false }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      setErrors({
        name: false,
        email: false,
        body: false,
      });

      const normalized = {
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      };

      if (!normalized.name || !normalized.email || !normalized.body) {
        setErrors({
          name: !normalized.name && true,
          email: !normalized.email && true,
          body: !normalized.body && true,
        });

        return;
      }

      onSubmit({
        name,
        email,
        body,
      });

      setValues(current => ({ ...current, body: '' }));
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
              className={cn('input', { 'is-danger': errors.name })}
              value={name}
              onChange={handleChange}
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
              className={cn('input', { 'is-danger': errors.email })}
              value={email}
              onChange={handleChange}
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
              className={cn('textarea', { 'is-danger': errors.body })}
              value={body}
              onChange={handleChange}
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
  },
);
