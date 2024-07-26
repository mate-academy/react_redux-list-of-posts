import classNames from 'classnames';
import React, { useState } from 'react';
import { CommentData } from '../types/Comment';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import { addComment } from '../features/Comments/commentsSlice';
import { Comment } from '../types/Comment';
import { createComment } from '../api/comments';

export const NewCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useSelector((state: RootState) => state.selecetedPost.value);

  const [comment, setComment] = useState({ name: '', email: '', body: '' });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const [loading, setLoading] = useState(false);

  const cleanForm = () => {
    setComment({ ...comment, body: '' });
    setErrors({ name: false, email: false, body: false });
  };

  async function createCommentRequest(
    commentProp: Omit<Comment, 'id'>,
  ): Promise<Comment | any> {
    setLoading(true);

    try {
      const data = await createComment(commentProp);

      if (data) {
        dispatch(addComment(data));
        cleanForm();
      }
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = ({ name, email, body }: CommentData) => {
    if (name && email && body && post) {
      const newComment = {
        name,
        email,
        body,
        postId: post.id,
      };

      createCommentRequest(newComment);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (value.trim() !== '') {
      setComment({ ...comment, [name]: value });
      setErrors({ ...errors, [name]: false });
    } else {
      setErrors({ ...errors, [name]: true });
    }
  };

  const { name, email, body } = comment;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;

    Object.entries(comment).forEach(([key, value]) => {
      if (!value) {
        setErrors({ ...errors, [key]: true });
        isValid = false;
      }
    });

    if (isValid) {
      onSubmit({ name, email, body });
    }
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
              'is-danger': errors.name,
            })}
            value={comment.name}
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
            className={classNames('input', {
              'is-danger': errors.email,
            })}
            value={comment.email}
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
              'is-danger': errors.body,
            })}
            value={comment.body}
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
              'is-loading': loading,
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
