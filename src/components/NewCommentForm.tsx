import classNames from 'classnames';
import React from 'react';
import { CommentData } from '../types/Comment';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import {
  AsyncPostComment,
  setErrors,
  clearForm,
  setInputs,
  FormObj,
} from '../features/CommentForm/commentFormSlice';

export const NewCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useSelector((state: RootState) => state.selecetedPost.value);
  const errors = useSelector((state: RootState) => state.commentForm.errors);
  const commentForm = useSelector((state: RootState) => state.commentForm);

  const onSubmit = ({ name, email, body }: CommentData) => {
    if (name && email && body && post) {
      const newComment = {
        name,
        email,
        body,
        postId: post.id,
      };

      dispatch(AsyncPostComment(newComment));
    }
  };

  const cleanForm = () => {
    dispatch(clearForm());
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    dispatch(setInputs({ field: name as keyof FormObj, value }));
    dispatch(setErrors(undefined));
  };

  const { name, email, body } = commentForm.value;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !body) {
      return;
    }

    onSubmit({ name, email, body });
  };

  return (
    <form onSubmit={handleSubmit} onReset={cleanForm} data-cy="NewCommentForm">
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
              'is-danger': commentForm.errors.name,
            })}
            value={commentForm.value.name}
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
            className={classNames('input', {
              'is-danger': commentForm.errors.email,
            })}
            value={commentForm.value.email}
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
            className={classNames('textarea', {
              'is-danger': commentForm.errors.body,
            })}
            value={commentForm.value.body}
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
              'is-loading': commentForm.status === 'loading',
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
