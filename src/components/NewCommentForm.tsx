import classNames from 'classnames';
import React, { useState } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  resetAllErrors,
  resetAllValues,
  setBodyError,
  setBodyValue,
  setEmailError,
  setEmailValue,
  setNameError,
  setNameValue,
} from '../features/posts/newCommentForm';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);

  const {
    value: name,
    hasError: nameError,
  } = useAppSelector(state => state.newComments.name);

  const {
    value: email,
    hasError: emailError,
  } = useAppSelector(state => state.newComments.email);

  const {
    value: body,
    hasError: bodyError,
  } = useAppSelector(state => state.newComments.body);

  const handleBlur = (
    value: string,
    actionFunction: (payload: boolean) => AnyAction,
  ) => {
    if (!value.trim()) {
      dispatch(actionFunction(true));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    actionErrorFunction: (payload: boolean) => AnyAction,
    actionValueFunction: (payload: string) => AnyAction,
  ) => {
    dispatch(actionValueFunction(e.target.value));
    dispatch(actionErrorFunction(false));
  };

  const clearForm = () => {
    dispatch(resetAllErrors());
    dispatch(resetAllValues());
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name) {
      dispatch(setNameError(true));
    }

    if (!email) {
      dispatch(setEmailError(true));
    }

    if (!body) {
      dispatch(setBodyError(true));
    }

    if (!name || !email || !body) {
      return;
    }

    setSubmitting(true);

    await onSubmit({ name, email, body });

    setSubmitting(false);
    dispatch(setBodyValue(''));
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
            className={classNames('input', {
              'is-danger': nameError,
            })}
            value={name}
            onChange={(e) => {
              handleChange(e, setNameError, setNameValue);
            }}
            onBlur={() => handleBlur(name, setNameError)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
              'is-danger': emailError,
            })}
            value={email}
            onChange={(e) => {
              handleChange(e, setEmailError, setEmailValue);
            }}
            onBlur={() => handleBlur(email, setEmailError)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
              'is-danger': bodyError,
            })}
            value={body}
            onChange={(e) => {
              handleChange(e, setBodyError, setBodyValue);
            }}
            onBlur={() => handleBlur(body, setBodyError)}
          />
        </div>

        {bodyError && (
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
      </div>
    </form>
  );
};
