import React, { useState } from 'react';
import { NewCommentFormProps } from '../types/NewCommentFormProps';
import { CommentData } from '../types/Comment';

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  // const [touched, setTouched] = useState<{
  //   name: boolean;
  //   email: boolean;
  //   body: boolean;
  // }>({ name: false, email: false, body: false });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    body?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!body.trim()) {
      newErrors.body = 'Body is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    setIsSubmitting(true);
    setLoading(true);

    const newComment: CommentData = { name, email, body };

    try {
      const savedComment = await onSubmit(newComment);

      setBody('');
      setErrors({});

      return savedComment;
      // setName('');
      // setEmail('');
      // setBody('');
      // setErrors({});
      // setTouched({ name: false, email: false, body: false });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrors({});
    // setTouched({ name: false, email: false, body: false });

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            value={name}
            placeholder="Name Surname"
            className={`input ${errors.name && !name ? 'is-danger' : ''}`}
            onChange={e => {
              setName(e.target.value);
              if (errors.name) {
                setErrors(prev => ({ ...prev, name: undefined }));
              }
            }}
            // onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errors.name && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.name}
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
            value={email}
            className={`input ${errors.email && !email ? 'is-danger' : ''}`}
            onChange={e => setEmail(e.target.value)}
            // onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {errors.email && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.email}
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
            value={body}
            className={`textarea ${errors.body ? 'is-danger' : ''}`}
            onChange={e => setBody(e.target.value)}
            // onBlur={() => setTouched(prev => ({ ...prev, body: true }))}
          />
          {errors.body && (
            <span className="icon is-small is-right" data-cy="ErrorIcon">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {errors.body}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${loading ? 'is-loading' : ''}`}
            disabled={isSubmitting}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
