import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { create, setBody, setEmail, setName, setOpened, setPostId, setSend } from './CommentsContext';
// import { CommentData } from '../types/Comment';

export const NewCommentForm = () => {
  // const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // const postId = useSelector((state: RootState) => state.userPosts.selectedPost);
  const opened = useSelector((state: RootState) => state.comments.opened);
  const sended = useSelector((state: RootState) => state.comments.send);
  const nameComment = useSelector((state: RootState) => state.comments.newComent.name);
  const emailComment = useSelector((state: RootState) => state.comments.newComent.email);
  const bodyComment = useSelector((state: RootState) => state.comments.newComent.body);
  const postIdComment = useSelector((state: RootState) => state.comments.newComent.postId);
  const selectedPost = useSelector((state: RootState) => state.userPosts.selectedPost);

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setName(event.target.value))
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setEmail(event.target.value))
  };

  const handleChangeBody = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setBody(event.target.value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (selectedPost?.id) {
      dispatch(setPostId(selectedPost?.id))
    }
    if (postIdComment && nameComment &&  emailComment && bodyComment) {
      dispatch(create({
        postId: postIdComment,
        name: nameComment,
        email: emailComment,
        body: bodyComment,
      }));
      dispatch(setOpened(!opened));
    } else {
      dispatch(setSend(false));
    }
    
  }
  
  // console.log(nameComment)
  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   setErrors({
  //     name: !name,
  //     email: !email,
  //     body: !body,
  //   });

  //   if (!name || !email || !body) {
  //     return;
  //   }

  //   setSubmitting(true);

  //   // it is very easy to forget about `await` keyword
  //   await onSubmit({ name, email, body });

  //   // and the spinner will disappear immediately
  //   setSubmitting(false);
  //   setValues(current => ({ ...current, body: '' }));
  //   // We keep the entered name and email
  // };

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
            className={classNames('input', { 'is-danger': !nameComment && !sended })}
            value={nameComment}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!nameComment && !sended && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!nameComment && !sended && (
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
            className={classNames('input', { 'is-danger': !emailComment && !sended })}
            value={emailComment}
            onChange={handleChangeEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!emailComment && !sended && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!emailComment && !sended && (
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
            className={classNames('textarea', { 'is-danger': !bodyComment && !sended })}
            value={bodyComment}
            onChange={handleChangeBody}
          />
        </div>

        {!bodyComment && !sended && (
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
              // 'is-loading': handleSubmit,
            })}
            // onClick={handleAdd}
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
