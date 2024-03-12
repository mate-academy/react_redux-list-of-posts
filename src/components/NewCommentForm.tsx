import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as newCommentActions from '../features/slicers/setNewComment';
import * as commentsApi from '../api/comments';
import * as commentsActions from '../features/slicers/getComments';

export const NewCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.getAuthor.post);
  const { errorName, errorEmail, errorBody, name, email, body, spinner } =
    useAppSelector(state => state.newComment);

  const clearForm = () => {
    dispatch(newCommentActions.clear());
    dispatch(newCommentActions.clearError());
  };

  // const handleChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name: field, value } = event.target;

  //   setValues(current => ({ ...current, [field]: value }));
  //   setErrors(current => ({ ...current, [field]: false }));
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      dispatch(newCommentActions.setErName(true));
    }

    if (!email) {
      dispatch(newCommentActions.setErEmail(true));
    }

    if (!body) {
      dispatch(newCommentActions.setErBody(true));
    }

    if (!name || !email || !body) {
      return;
    }

    dispatch(newCommentActions.spiner(true));

    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post?.id || 0,
      });

      dispatch(commentsActions.addComment(newComment));
    } catch (e) {
      dispatch(commentsActions.setError());
    }

    dispatch(newCommentActions.spiner(false));
    dispatch(newCommentActions.clearBody());
    dispatch(newCommentActions.clearError());
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
            className={classNames('input', { 'is-danger': errorName })}
            value={name}
            onChange={e => {
              dispatch(newCommentActions.setName(e.target.value));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
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
            className={classNames('input', { 'is-danger': errorEmail })}
            value={email}
            onChange={e => {
              dispatch(newCommentActions.setEmail(e.target.value));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
              'is-danger': errorBody,
            })}
            value={body}
            onChange={e => {
              dispatch(newCommentActions.setBody(e.target.value));
            }}
          />
        </div>

        {errorBody && (
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
              'is-loading': spinner,
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
