import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { CommentData } from '../types/Comment';
import { useAppSelector } from '../app/hooks';
import { CommentDataSlice } from './NewCommentState';

type Props = {
  onSubmit: (data: CommentData) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ onSubmit }) => {
  const submitting = useAppSelector(state => state.commentData.submitting);
  const { name, email, body }
  = useAppSelector(state => state.commentData.value);
  const { nameError, emailError, bodyError }
  = useAppSelector(state => state.commentData.error);

  const dispatch = useDispatch();

  const clearForm = () => {
    dispatch(CommentDataSlice.actions.clearComment());
    dispatch(CommentDataSlice.actions.clearError());
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    dispatch(CommentDataSlice.actions
      .setComment({
        name,
        email,
        body,
        [field]: value,
      }));

    dispatch(CommentDataSlice.actions
      .setError({
        nameError,
        emailError,
        bodyError,
        [`${field}Error`]: false,
      }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(CommentDataSlice.actions.setError({
      nameError: !name,
      emailError: !email,
      bodyError: !body,
    }));

    if (!name || !email || !body) {
      return;
    }

    dispatch(CommentDataSlice.actions.setsubmitting(true));
    await onSubmit({ name, email, body });
    dispatch(CommentDataSlice.actions.setsubmitting(false));
    dispatch(CommentDataSlice.actions.setComment({
      name,
      email,
      body: '',
    }));
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
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
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
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
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
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={handleChange}
          />
        </div>

        {bodyError && (
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
