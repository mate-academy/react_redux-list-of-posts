import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addNewComment,
  clearNewComment,
  setNewCommentError,
  setNewCommentField,
} from '../features/postComments/postCommentsSlice';

enum NewCommentKeys {
  name = 'name',
  email = 'email',
  body = 'body',
}

export const NewCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const postId = useAppSelector(state => state.userPosts.selectedPost?.id);
  const values = useAppSelector(state => state.postComments.newComment);
  const errors = useAppSelector(state => state.postComments.newCommentError);
  const [submitting, setSubmitting] = useState(false);
  const [query, setQuery] = useState(
    { name: '', email: '', body: '' },
  );

  const handleChange = useCallback(debounce((
    field: NewCommentKeys,
    value: string,
  ) => {
    // eslint-disable-next-line max-len
    if (errors[field]) {
      dispatch(setNewCommentError({ ...errors, [field]: false }));
    }

    dispatch(setNewCommentField({ key: field, value }));
  }, 500), []);

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
      // eslint-disable-next-line object-curly-newline
      dispatch(addNewComment({ name, email, body, postId }));
    }

    setSubmitting(false);

    dispatch(setNewCommentField({ key: 'body', value: '' }));
    setQuery(prev => ({ ...prev, body: '' }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => {
        dispatch(clearNewComment());
        setQuery({ name: '', email: '', body: '' });
      }}
    >
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
            value={query.name}
            onChange={event => {
              setQuery(prev => ({ ...prev, name: event.target.value }));
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
            value={query.email}
            onChange={({ target }) => {
              setQuery(prev => ({ ...prev, email: target.value }));
              handleChange(NewCommentKeys.email, target.value);
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
            value={query.body}
            onChange={({ target }) => {
              setQuery(prev => ({ ...prev, body: target.value }));
              handleChange(NewCommentKeys.body, target.value);
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
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': submitting },
            )}
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
