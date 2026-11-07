/* eslint-disable no-param-reassign */
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addEmail,
  addName,
  addPostIdNewComment,
  addText,
  checkForErrors,
  creatNewComment,
  resetForm,
} from '../features/Coments/newCommentSlice';
// import { CommentData } from '../types/Comment';

// type Props = {
//   onSubmit: (data: CommentData) => Promise<void>;
// };

type Field = 'name' | 'email' | 'text';

export const NewCommentForm: React.FC = () => {
  const id = useAppSelector(state => state.setPost.postSelected?.id);

  const dispatch = useAppDispatch();
  const name = useAppSelector(state => state.newComment.name);
  const email = useAppSelector(state => state.newComment.email);
  const text = useAppSelector(state => state.newComment.text);
  const errors = useAppSelector(state => state.newComment.errors);
  const postId = useAppSelector(state => state.newComment.postId);
  const loading = useAppSelector(state => state.newComment.loading);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(addPostIdNewComment(id));
    }
  }, [id, dispatch]);
  // const [{ name, email, body }, setValues] = useState({
  //   name: '',
  //   email: '',
  //   body: '',
  // });

  // const clearForm = () => {
  //   setValues({
  //     name: '',
  //     email: '',
  //     body: '',
  //   });

  //   setErrors({
  //     name: false,
  //     email: false,
  //     body: false,
  //   });
  // };

  function handleChange(item: string, type: Field) {
    if (type === 'name') {
      dispatch(addName(item));
    }

    if (type === 'email') {
      dispatch(addEmail(item));
    }

    if (type === 'text') {
      dispatch(addText(item));
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(checkForErrors());
    if (name.length === 0 || email.length === 0 || text.length === 0) {
      return;
    }

    // it is very easy to forget about `await` keyword
    // await onSubmit({ name, email, body });

    // and the spinner will disappear immediately
    // setValues(current => ({ ...current, body: '' }));
    // We keep the entered name and email
    dispatch(creatNewComment({ name, email, body: text, postId }));
  };

  return (
    <form onSubmit={handleSubmit} data-cy="NewCommentForm">
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
            // value={name}
            value={name}
            onChange={event => handleChange(event.target.value, 'name')}
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
            onChange={event => handleChange(event.target.value, 'email')}
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
            className={classNames('textarea', { 'is-danger': errors.text })}
            value={text}
            onChange={event => handleChange(event.target.value, 'text')}
          />
        </div>

        {errors.text && (
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
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => dispatch(resetForm())}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
