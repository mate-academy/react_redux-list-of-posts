import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  actions as actionsNewComment,
} from '../features/newFormComment/newFormCommentSlice';
import { addNewComment } from '../features/comments/commentsSlice';

export const NewCommentForm: React.FC = () => {
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });
  const dispatch = useAppDispatch();
  const { name, body, email } = useAppSelector(state => state.newFormComment);
  const {
    submitting,
    comments,
    errorNewComment,
  } = useAppSelector(state => state.comments);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const postId = selectedPost?.id;

  const clearForm = () => {
    dispatch(actionsNewComment.clearForm());

    setErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({
      name: !name,
      email: !email,
      body: !body,
    });

    if (!name || !email || !body) {
      return;
    }

    if (postId) {
      dispatch(addNewComment({
        name,
        body,
        email,
        postId,
      }));
    }
  };

  useEffect(() => {
    dispatch(actionsNewComment.addingBody(''));
  }, [comments]);

  return (
    <>
      <form
        data-cy="NewCommentForm"
        onReset={clearForm}
        onSubmit={handleSubmit}
        style={{ marginBottom: '12px' }}
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
              onChange={(event) => (
                dispatch(actionsNewComment.addingName(event.target.value))
              )}
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
              onChange={
                (event) => (
                  dispatch(actionsNewComment.addingEmail(event.target.value))
                )
              }
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
              onChange={
                (event) => (
                  dispatch(actionsNewComment.addingBody(event.target.value))
                )
              }
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

          <div className="control">
            <button
              type="button"
              className="button is-link is-warning"
              onClick={() => dispatch(actionsNewComment.setVisible(false))}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      {errorNewComment && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}
    </>
  );
};
