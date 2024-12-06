import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addComment } from '../features/commentsSlice';
import {
  clearAllData,
  selectFormData,
  selectFormErrors,
  setAllErrors,
  setValue,
} from '../features/newCommentFormSlice';
import { CommentData } from '../types/Comment';

type Props = {};

export const NewCommentForm: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.selectedPost);
  const { isSubmiting } = useAppSelector(state => state.comments);
  const { name, email, body } = useAppSelector(selectFormData);
  const errors = useAppSelector(selectFormErrors);

  const clearForm = () => {
    dispatch(clearAllData());
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: fieldName, value } = event.target;

    const field = fieldName as keyof CommentData;

    dispatch(setValue({ field, value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(
      setAllErrors({
        name: !name,
        email: !email,
        body: !body,
      }),
    );

    if (!name || !email || !body) {
      return;
    }

    dispatch(
      addComment({
        name: name,
        email: email,
        body: body,
        postId: selectedPost!.id,
      }),
    );

    dispatch(setValue({ field: 'body', value: '' }));
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
              'is-loading': isSubmiting,
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
};
