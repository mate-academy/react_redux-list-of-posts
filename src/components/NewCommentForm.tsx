import classNames from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearNewCommentForm, selectNewCommentErrors, selectNewCommentValue, setNewCommentErrors, setNewCommentValue,
} from '../features/newComment/newCommentSlice';
import { CommentData } from '../types/Comment';

type Props = {
  // onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = () => {
  const [submitting, setSubmitting] = useState(false);

  // const [errors, setErrors] = useState({
  //   name: false,
  //   email: false,
  //   body: false,
  // });

  // const [{ name, email, body }, setValues] = useState({
  //   name: '',
  //   email: '',
  //   body: '',
  // });
  const dispatch = useAppDispatch();
  const { name, email, body } = useAppSelector(selectNewCommentValue);
  const errors = useAppSelector(selectNewCommentErrors);

  // const { value, errors }

  const clearForm = () => {
    // setValues({
    //   name: '',
    //   email: '',
    //   body: '',
    // });

    // setErrors({
    //   name: false,
    //   email: false,
    //   body: false,
    // });
    dispatch(clearNewCommentForm());
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    // eslint-disable-next-line no-console
    console.log(name, value);

    // setValues(current => ({ ...current, [field]: value }));
    // setErrors(current => ({ ...current, [field]: false }));

    dispatch(setNewCommentValue({ field, value }));
    dispatch(setNewCommentErrors({ field, value: false }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    // const { name } = event.target;

    event.preventDefault();

    // setErrors({
    //   name: !name,
    //   email: !email,
    //   body: !body,
    // });

    // eslint-disable-next-line no-console
    console.log('before', 'name: ',
      name, 'email:', email, 'body: ', body, errors);

    dispatch(setNewCommentErrors({ field: 'name', value: !name }));
    dispatch(setNewCommentErrors({ field: 'email', value: !email }));
    dispatch(setNewCommentErrors({ field: 'body', value: !body }));
    // eslint-disable-next-line no-console
    console.log('after', !name, !email, !body, errors);

    if (!name || !email || !body) {
      return;
    }

    setSubmitting(true);

    // it is very easy to forget about `await` keyword
    // await onSubmit({ name, email, body });

    // and the spinner will disappear immediately
    setSubmitting(false);
    // setValues(current => ({ ...current, body: '' }));
    // We keep the entered name and email
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
