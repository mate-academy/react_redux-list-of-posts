import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  resetForm,
  setBody,
  setEmail,
  setErrors,
  setName,
  clearBody,
  setSubmitting,
} from '../features/commentFormSlice';
import { createComment } from '../api/comments';
import { addComment } from '../features/commentsSlice';

export const NewCommentForm: React.FC = () => {
  const { name, email, body, errors, isSubmitting } = useAppSelector(
    state => state.commentForm,
  );
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: fieldName, value } = event.target;

    switch (fieldName) {
      case 'name':
        dispatch(setName(value));
        break;
      case 'email':
        dispatch(setEmail(value));
        break;
      case 'body':
        dispatch(setBody(value));
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fieldErrors = {
      name: !name.trim(),
      email: !email.trim(),
      body: !body.trim(),
    };

    if (fieldErrors.name || fieldErrors.email || fieldErrors.body) {
      dispatch(setErrors(fieldErrors));

      return;
    }

    dispatch(setSubmitting(true));
    dispatch(setErrors({ name: false, email: false, body: false }));

    try {
      if (!selectedPost) {
        throw new Error('No post selected');
      }

      const newComment = await createComment({
        name,
        email,
        body,
        postId: selectedPost.id,
      });

      dispatch(addComment(newComment));
      dispatch(clearBody());
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => dispatch(resetForm())}
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
            className={classNames('input', { 'is-danger': errors.email })}
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
            className={classNames('textarea', { 'is-danger': errors.body })}
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
            className={classNames('button', 'is-link', {
              'is-loading': isSubmitting,
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
