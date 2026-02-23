import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (data: CommentData) => Promise<void> | void;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    body: false,
  });

  const [{ name, email, body }, setValues] = useState({
    name: '',
    email: '',
    body: '',
  });

  const clearForm = () => {
    setValues({
      name: '',
      email: '',
      body: '',
    });

    setErrors({
      name: false,
      email: false,
      body: false,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: false }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({
      name: !name,
      email: !email,
      body: !body,
    });

    if (!name || !email || !body) {
      return;
    }

    setSubmitting(true);

    await onSubmit({ name, email, body });

    setSubmitting(false);
    setValues(current => ({ ...current, body: '' }));
  };

  return (
    <form onSubmit={handleSubmit} onReset={clearForm} data-cy="NewCommentForm">
      <div className="field">
        <input
          name="name"
          value={name}
          onChange={handleChange}
          className={classNames('input', { 'is-danger': errors.name })}
        />
      </div>

      <div className="field">
        <input
          name="email"
          value={email}
          onChange={handleChange}
          className={classNames('input', { 'is-danger': errors.email })}
        />
      </div>

      <div className="field">
        <textarea
          name="body"
          value={body}
          onChange={handleChange}
          className={classNames('textarea', { 'is-danger': errors.body })}
        />
      </div>

      <button
        type="submit"
        className={classNames('button is-link', {
          'is-loading': submitting,
        })}
      >
        Add
      </button>
    </form>
  );
};
