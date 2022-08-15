import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setValues,
  setIsRemember,
  newCommentForm,
} from './newCommentFormSlice';
import { addComment, postDetails } from '../postDetails/postDetailsSlice';

import { CommentData } from '../../types/Comment';
import Status from '../../enums/Status';

const initialComment: CommentData = {
  name: '',
  email: '',
  body: '',
};

export const NewCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { values, remember } = useAppSelector(newCommentForm);
  const { selectedPost, status } = useAppSelector(postDetails);
  const submitting = status === Status.Loading;

  const [currentValues, setCurrentValues] = useState(() => {
    if (remember) {
      return {
        ...values,
        body: '',
      };
    }

    return initialComment;
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const isErrors = useMemo(() => {
    return Object.values(errors).some(value => value);
  }, [errors]);

  const clearForm = () => {
    setCurrentValues(initialComment);
  };

  /**
   * This factory function returns a change handler for a given field
   */
  const handleChange = (field: string) => {
    return (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setErrors({ ...errors, [field]: false });
      setCurrentValues({ ...currentValues, [field]: event.target.value });
    };
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { name, body, email } = currentValues;

    setErrors({
      name: !name,
      email: !email,
      body: !body,
    });

    if (!name || !body || !email) {
      return;
    }

    dispatch(setValues(currentValues));

    if (selectedPost) {
      dispatch(addComment({ ...currentValues, postId: selectedPost.id }));
    }
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
            value={currentValues.name}
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
            value={currentValues.email}
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
            value={currentValues.body}
            onChange={handleChange('body')}
          />
        </div>

        {errors.body && (
          <p className="help is-danger">Enter some text</p>
        )}
      </div>

      <div className="field is-horizontal">
        <label className="label mr-2" htmlFor="comment-remember-me">
          Remember me
        </label>

        <div className="control">
          <input
            type="checkbox"
            id="comment-remember-me"
            checked={remember}
            onChange={() => dispatch(setIsRemember(!remember))}
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': submitting,
            })}
            disabled={isErrors}
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
