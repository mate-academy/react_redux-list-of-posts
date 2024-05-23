import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as newCommentFormActions from '../features/comments/newCommentForm';
import * as commentsActions from '../features/comments/comments';

export const NewCommentForm: React.FC = () => {
  const { commentData, errors, loading } = useAppSelector(
    state => state.newCommentForm,
  );
  const seelctedPost = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(
      newCommentFormActions.setCommentData(
        newCommentFormActions.defaultCommentData,
      ),
    );
    dispatch(
      newCommentFormActions.setErrors(newCommentFormActions.defaultErrorValues),
    );
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(
      newCommentFormActions.setErrors({ ...errors, [event.target.name]: '' }),
    );

    dispatch(
      newCommentFormActions.setCommentData({
        ...commentData,
        [event.target.name]: event.target.value,
      }),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = commentData.name.trim();
    const normalizedEmail = commentData.email.trim();
    const normalizedBody = commentData.body.trim();

    const currentErrors = {
      name: !normalizedName ? 'Name is required' : '',
      email: !normalizedEmail ? 'Email is required' : '',
      body: !normalizedBody ? 'Enter some text' : '',
    };

    if (currentErrors.name || currentErrors.email || currentErrors.body) {
      dispatch(
        newCommentFormActions.setErrors({ ...errors, ...currentErrors }),
      );

      return;
    }

    dispatch(newCommentFormActions.setIsLoading(true));

    if (seelctedPost?.id) {
      dispatch(
        commentsActions.addComment({
          name: normalizedName,
          email: normalizedEmail,
          body: normalizedBody,
          postId: seelctedPost?.id,
        }),
      );
    } else {
      dispatch(newCommentFormActions.setIsLoading(false));
      // eslint-disable-next-line
      console.error('Post ID is undefined');
    }

    dispatch(newCommentFormActions.setIsLoading(false));
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
            className={classNames('input', { 'is-danger': errors.name })}
            value={commentData.name}
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
            value={commentData.email}
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
            value={commentData.body}
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
              'is-loading': loading,
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
