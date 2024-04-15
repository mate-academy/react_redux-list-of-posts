/* eslint-disable */
import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  create,
  setBody,
  setClear,
  setEmail,
  setName,
  setPostId,
  setSend,
} from './CommentsSlice';

export const NewCommentForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const opened = useSelector((state: RootState) => state.comments.opened);
  const sended = useSelector((state: RootState) => state.comments.send);
  // eslint-disable-next-line
  const nameComment = useSelector((state: RootState) => state.comments.newComent.name);
  // eslint-disable-next-line
  const emailComment = useSelector((state: RootState) => state.comments.newComent.email);
  // eslint-disable-next-line
  const bodyComment = useSelector((state: RootState) => state.comments.newComent.body);
  // eslint-disable-next-line
  const postIdComment = useSelector((state: RootState) => state.comments.newComent.postId);
  // eslint-disable-next-line
  const selectedPost = useSelector((state: RootState) => state.userPosts.selectedPost);
  // eslint-disable-next-line
  const loading = useSelector((state: RootState) => state.comments.loadingNewComment);

  const handleChangeName = (
    // eslint-disable-next-line
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setName(event.target.value));
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setEmail(event.target.value));
  };

  const handleChangeBody = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setBody(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (selectedPost?.id) {
      dispatch(setPostId(selectedPost?.id));
    };

    if (postIdComment &&
      nameComment.trim() &&
      emailComment.trim() &&
      bodyComment.trim() &&
      nameComment &&
      emailComment &&
      bodyComment
    ) {
      dispatch(create({
        postId: postIdComment,
        name: nameComment,
        email: emailComment,
        body: bodyComment,
      }));
    } 
    else {
      dispatch(setSend(false));
    };
  };

  return (
    <form 
    onSubmit={handleSubmit}
    // onReset={clearForm}
    data-cy="NewCommentForm">
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
            className={classNames('input', { 'is-danger': ((!nameComment.trim()|| !nameComment) && !sended) })}
            value={nameComment}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {((!nameComment.trim() || !nameComment) && !sended) && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {((!nameComment.trim() || !nameComment) && !sended) && (
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
            // eslint-disable-next-line
            className={classNames('input', { 'is-danger': ((!emailComment.trim() || !emailComment) && !sended) })}
            value={emailComment}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {((!emailComment.trim() || !emailComment) && !sended)&& (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {((!emailComment.trim() || !emailComment) && !sended) && (
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
            // eslint-disable-next-line
            className={classNames('textarea', { 'is-danger': (!bodyComment && !sended) || (!bodyComment.trim() && !sended) })}
            value={bodyComment}
            onChange={handleChangeBody}
          />
        </div>

        {(!bodyComment && !sended) || (!bodyComment.trim() && !sended) && (
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
            // onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => dispatch(setClear())}>
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
