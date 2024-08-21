import classNames from 'classnames';
import React, { useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import {
  addComment,
  actions as newCommentActions,
} from '../features/NewCommentFormSlice';
import { actions as comentsActions } from '../features/commentsSlice';
import { validateEmail } from '../utils/validateEmail';

type Props = {
  post: Post;
};

export const NewCommentForm: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, AnyAction>>();
  const { errors, submitting, submitError } = useAppSelector(
    state => state.newCommentForm,
  );

  const addNewComment = (comment: CommentData) => {
    const newComment: Omit<Comment, 'id'> = { ...comment, postId: post.id };

    return dispatch(addComment(newComment));
  };

  const [{ name, email, body }, setValues] = useState({
    name: '',
    email: '',
    body: '',
  });

  const clearForm = () => {
    dispatch(
      newCommentActions.setErrors({
        name: false,
        email: false,
        body: false,
      }),
    );

    dispatch(newCommentActions.clearInputs());
    dispatch(newCommentActions.clearErrors());

    setValues({
      name: '',
      email: '',
      body: '',
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    setValues(current => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();
    const normalizedBody = body.trim();
    const checkEmail = validateEmail(normalizedEmail);

    dispatch(
      newCommentActions.setErrors({
        name: normalizedName,
        email: checkEmail,
        body: normalizedBody,
      }),
    );

    if (!normalizedName || !normalizedEmail || !normalizedBody) {
      return;
    }

    await addNewComment({ name, email, body });

    if (!submitError) {
      const uniqueId = Date.now();

      dispatch(
        comentsActions.addComment({
          name,
          email,
          body,
          postId: post.id,
          id: `${name}${uniqueId} `,
        }),
      );
    }

    setValues(current => ({ ...current, body: '' }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={clearForm}
      data-cy="NewCommentForm"
      autoComplete="off"
      noValidate
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
            type="email"
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
              'is-loading': submitting,
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
