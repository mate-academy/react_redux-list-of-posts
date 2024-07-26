import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  setName,
  setEmail,
  setBody,
  setPostId,
  setSend,
  setClear,
} from './slices/CommentsSlice';

export const NewCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selectedPost } = useAppSelector(state => state.userPosts);
  const { newComment, send, loadingNewComment } = useAppSelector(
    state => state.comments,
  );

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  };

  const handleChangeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setBody(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      newComment.postId &&
      newComment.name.trim() &&
      newComment.email.trim() &&
      newComment.body.trim()
    ) {
      dispatch(
        addComment({
          postId: newComment.postId,
          name: newComment.name,
          email: newComment.email,
          body: newComment.body,
        }),
      ).then(() => {
        dispatch(setBody(''));
      });
    } else {
      dispatch(setSend(false));
    }
  };

  useEffect(() => {
    dispatch(setPostId(selectedPost!.id));
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => dispatch(setClear())}
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
            className={classNames('input', {
              'is-danger': !newComment.name.trim() && !send,
            })}
            value={newComment.name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!newComment.name.trim() && !send && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!newComment.name.trim() && !send && (
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
              'is-danger': !newComment.email.trim() && !send,
            })}
            value={newComment.email}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!newComment.email.trim() && !send && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!newComment.email.trim() && !send && (
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
              'is-danger': !newComment.body.trim() && !send,
            })}
            value={newComment.body}
            onChange={handleChangeBody}
          />
        </div>

        {!newComment.body.trim() && !send && (
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
              'is-loading': loadingNewComment,
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
