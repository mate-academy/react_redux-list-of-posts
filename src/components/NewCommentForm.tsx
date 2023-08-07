import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  checkedValue,
  clearValue,
  addName,
  addBody,
  addEmail,
  createFromServerPost,
} from '../features/commentsAPI';
import { takeSelectPost, selectComment } from '../app/store';

export const NewCommentForm = () => {
  const dispatch = useAppDispatch();
  const { newComment, errors, statusCreate } = useAppSelector(selectComment);
  const { selectPost } = useAppSelector(takeSelectPost);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(checkedValue());
    const { name, email, body } = errors;

    if (name || email || body) {
      return;
    }

    if (selectPost) {
      dispatch(createFromServerPost({
        name: newComment.name,
        email: newComment.email,
        body: newComment.body,
        postId: selectPost.id,
      }));
      dispatch(clearValue());
    }
  };

  const onResetForm = () => {
    dispatch(clearValue());
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={onResetForm}
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
            value={newComment.name}
            onChange={(e) => dispatch(addName(e.target.value))}
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
            value={newComment.email}
            onChange={(e) => dispatch(addEmail(e.target.value))}
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
            value={newComment.body}
            onChange={(e) => dispatch(addBody(e.target.value))}
          />
        </div>

        {errors.body && (
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
              'is-loading': statusCreate === 'loading',
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
