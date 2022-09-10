import classNames from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearNewComment, createCommentsAsync, setNewCommentError, setNewCommentField,
} from '../features/commentSlice/commentSlice';

enum NewCommentKeys {
  name = 'name',
  email = 'email',
  body = 'body',
}

export const NewCommentForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const postId = useAppSelector(state => state.posts.selectedPost?.id);
  const values = useAppSelector(state => state.comments.newComment);
  const errors = useAppSelector(state => state.comments.newCommentError);
  const dispatch = useAppDispatch();

  const handleChange = (field: NewCommentKeys, value: string) => {
    dispatch(setNewCommentError({ ...errors, [field]: false }));
    dispatch(setNewCommentField({ key: field, value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { name, body, email } = values;

    dispatch(setNewCommentError({
      name: !name,
      email: !email,
      body: !body,
    }));

    if (!name || !body || !email) {
      return;
    }

    setSubmitting(true);

    if (postId) {
      dispatch(createCommentsAsync({
        name, email, body, postId,
      }));
    }

    setSubmitting(false);

    dispatch(setNewCommentField({ key: 'body', value: '' }));
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => dispatch(clearNewComment())}>
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
            onChange={(event) => {
              handleChange(NewCommentKeys.name, event.target.value);
            }}
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
            onChange={(event) => {
              handleChange(NewCommentKeys.email, event.target.value);
            }}
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
            onChange={(event) => {
              handleChange(NewCommentKeys.body, event.target.value);
            }}
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
