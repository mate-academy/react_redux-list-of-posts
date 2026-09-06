import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addComment } from '../app/Comments';

interface Props {
  postId: number;
}

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const { adding: isSubmitting } = useAppSelector(state => state.comments);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [hasNameError, setHasNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasBodyError, setHasBodyError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isNameValid = name.trim() !== '';
    const isEmailValid = email.trim() !== '';
    const isBodyValid = body.trim() !== '';

    setHasNameError(!isNameValid);
    setHasEmailError(!isEmailValid);
    setHasBodyError(!isBodyValid);

    if (!isNameValid || !isEmailValid || !isBodyValid) {
      return;
    }

    dispatch(addComment({ postId, name, email, body })).then(() => {
      setBody('');
    });
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasNameError(false);
    setHasEmailError(false);
    setHasBodyError(false);
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
            placeholder="Name Surname"
            className={`input ${hasNameError ? 'is-danger' : ''}`}
            value={name}
            onChange={event => {
              setName(event.target.value);
              setHasNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameError && (
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
            className={`input ${hasEmailError ? 'is-danger' : ''}`}
            value={email}
            onChange={event => {
              setEmail(event.target.value);
              setHasEmailError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
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
            className={`textarea ${hasBodyError ? 'is-danger' : ''}`}
            value={body}
            onChange={event => {
              setBody(event.target.value);
              setHasBodyError(false);
            }}
          />
        </div>

        {hasBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={`button is-link ${isSubmitting ? 'is-loading' : ''}`}
          >
            Add
          </button>
        </div>

        <div className="control">
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
