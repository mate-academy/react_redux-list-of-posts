import React, { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions } from '../features/commentsSlice';
import { Comment } from '../types/Comment';

export const NewCommentForm: React.FC = () => {
  const [{ name, email, body }, setValues] = useState({
    name: '',
    email: '',
    body: '',
  });

  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost.value);
  const commentErrors = useAppSelector(state => state.comments.errors);
  const isAddingComment = useAppSelector(
    state => state.comments.isAddingComment,
  );
  const comments = useAppSelector(state => state.comments.items);

  const clearCommentErrors = () =>
    dispatch(
      actions.setErrors({
        name: false,
        email: false,
        body: false,
      }),
    );

  const setCommentErrors = () =>
    dispatch(
      actions.setErrors({
        name: !name,
        email: !email,
        body: !body,
      }),
    );

  const clearForm = () => {
    setValues({
      name: '',
      email: '',
      body: '',
    });

    clearCommentErrors();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    setValues(current => ({ ...current, [field]: value }));

    dispatch(actions.setErrors({ ...commentErrors, [field]: false }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!!selectedPost) {
      setCommentErrors();

      if (!name || !email || !body) {
        return;
      }

      const highestCommentId = [...comments].sort(
        (commentA: Comment, commentB: Comment) => commentB.id - commentA.id,
      )[0];

      const comment: Comment = {
        id: highestCommentId?.id + 1 ?? 1,
        postId: selectedPost.id,
        name: name,
        email: email,
        body: body,
      };

      dispatch(actions.add(comment));

      setValues({
        name,
        email,
        body: '',
      });
    }
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
            className={classNames('input', { 'is-danger': commentErrors.name })}
            value={name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {commentErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {commentErrors.name && (
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
            className={classNames('input', {
              'is-danger': commentErrors.email,
            })}
            value={email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {commentErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {commentErrors.email && (
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
            className={classNames('textarea', {
              'is-danger': commentErrors.body,
            })}
            value={body}
            onChange={handleChange}
          />
        </div>

        {commentErrors.body && (
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
              'is-loading': isAddingComment,
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
