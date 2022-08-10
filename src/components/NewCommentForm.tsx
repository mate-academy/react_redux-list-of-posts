import classNames from 'classnames';
import React, { useState } from 'react';
import { clientAPI } from '../store/clientApi';
import { useAppSelector } from '../store/hooks';
import { Comment } from '../types/Comment';

export const NewCommentForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [addComment] = clientAPI.useAddCommentMutation();
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const [values, setValues] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const clearForm = () => {
    setValues({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleChange = (field: string) => {
    // eslint-disable-next-line max-len
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setErrors({ ...errors, [field]: false });
      setValues({ ...values, [field]: event.target.value });
    };
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { name, body, email } = values;

    setErrors({
      name: !name,
      email: !email,
      body: !body,
    });

    if (!name || !body || !email) {
      return;
    }

    if (selectedPost) {
      setSubmitting(true);
      await addComment({
        name,
        email,
        body,
        postId: selectedPost?.id,
      } as Comment);
      setSubmitting(false);
    }

    setValues({ ...values, body: '' });
  };

  return (
    <form onSubmit={handleSubmit} onReset={clearForm}>
      <div className="field">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': errors.name })}
            value={values.name}
            onChange={handleChange('name')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span className="icon is-small is-right has-text-danger">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
          <p className="help is-danger">Name is required</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={values.email}
            onChange={handleChange('email')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errors.email && (
            <span className="icon is-small is-right has-text-danger">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
          <p className="help is-danger">Email is required</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': errors.body })}
            value={values.body}
            onChange={handleChange('body')}
          />
        </div>

        {errors.body && (
          <p className="help is-danger">Enter some text</p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': submitting,
            })}
            onClick={handleSubmit}
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
