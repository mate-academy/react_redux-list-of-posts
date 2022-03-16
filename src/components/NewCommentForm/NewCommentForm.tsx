import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getComments } from '../../api/comments';
import {
  changeCommentBodyAction,
  changeEmailAction,
  changeNameAction,
  loadCommentsAction,
} from '../../store/actions';
import { getNewCommentSelector } from '../../store/selectors';
import './NewCommentForm.scss';

type Props = {
  postId: number,
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const newComment = useSelector(getNewCommentSelector);
  const { postId } = props;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addComment(postId, newComment);
    dispatch(loadCommentsAction(await getComments(postId)));
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newComment.name}
          onChange={(event) => dispatch(changeNameAction(event.target.value))}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newComment.email}
          onChange={(event) => dispatch(changeEmailAction(event.target.value))}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newComment.body}
          onChange={(event) => dispatch(changeCommentBodyAction(event.target.value))}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
