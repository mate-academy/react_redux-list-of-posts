import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../api/comments';
import { actions, selectors } from '../../store';
import './NewCommentForm.scss';

type Props = {
  postId: number;
};

export const NewCommentForm: React.FC<Props> = React.memo((
) => {
  const [isValid, setIsValid] = useState(true);
  const [comment, setComment] = useState({
    name: '',
    email: '',
    body: '',
  });

  const postId = useSelector(selectors.getPostId);

  const dispatch = useDispatch();

  const stateReset = () => {
    setComment({
      name: '',
      email: '',
      body: '',
    });
  };

  const changeHangler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    property: string,
  ) => {
    setComment(curr => ({
      ...curr,
      [property]: event.target.value,
    }));
  };

  const toPostComment = () => {
    const { name, email, body } = comment;

    postComment(postId, name, email, body)
      .then(() => dispatch(actions.loadComments(postId)));
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        if (!!comment.name.length && !!comment.body.length) {
          toPostComment();
          stateReset();
        } else {
          setIsValid(false);
        }
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={comment.name}
          onChange={event => changeHangler(event, 'name')}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={comment.email}
          onChange={event => changeHangler(event, 'email')}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input NewCommentForm__input--textarea"
          value={comment.body}
          onChange={event => changeHangler(event, 'body')}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>

      {!isValid && (
        <p className="NewCommentForm__warning-message">
          Enter valid data!
        </p>
      )}
    </form>
  );
});
