import classNames from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import {
  clearBody,
  clearForm,
  handleChange,
  NewCommentFormState,
  selectNewCommentForm,
  setErrors,
} from '../features/newCommentForm';
import { addComment } from '../features/comments';
import { selectSelectedPost } from '../features/selectedPost';

const errorsFields: NewCommentFormState['errors'] = {
  name: false,
  email: false,
  body: false,
};

export const NewCommentForm = () => {
  const state = useAppSelector(selectNewCommentForm);
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);
  const selectedPost = useAppSelector(selectSelectedPost);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const notValidFields = { ...errorsFields };

    for (const key of Object.keys(state.errors) as (keyof Omit<
      NewCommentFormState,
      'errors'
    >)[]) {
      if (state[key] === '') {
        notValidFields[key] = true;
      }
    }

    const isNotValid = Object.values(notValidFields).some(value => value);

    dispatch(setErrors(notValidFields));
    if (isNotValid) {
      return;
    }

    try {
      setSubmitting(true);

      await dispatch(
        addComment({
          postId: Number(selectedPost?.id),
          name: state.name,
          email: state.email,
          body: state.body,
        }),
      ).unwrap();

      dispatch(clearBody());
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => dispatch(clearForm())}
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
            className={classNames('input', { 'is-danger': state.errors.name })}
            value={state.name}
            onChange={e =>
              dispatch(
                handleChange({
                  field: 'name',
                  value: e.target.value,
                }),
              )
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {state.errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {state.errors.name && (
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
            className={classNames('input', { 'is-danger': state.errors.email })}
            value={state.email}
            onChange={e =>
              dispatch(
                handleChange({
                  field: 'email',
                  value: e.target.value,
                }),
              )
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {state.errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {state.errors.email && (
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
              'is-danger': state.errors.body,
            })}
            value={state.body}
            onChange={e =>
              dispatch(
                handleChange({
                  field: 'body',
                  value: e.target.value,
                }),
              )
            }
          />
        </div>

        {state.errors.body && (
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
              'is-loading': submitting,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => dispatch(setErrors(errorsFields))}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
