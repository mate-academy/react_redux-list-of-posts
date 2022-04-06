import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addComment, fetchCommentsByPostId } from '../../store/reducers/ActionCreators';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC = () => {
  const { selectedPostId } = useAppSelector(state => state.postReducer);
  const dispatch = useAppDispatch();

  const initialComment = {
    postId: selectedPostId as number,
    name: '',
    email: '',
    body: '',
  };

  const [comment, setComment] = useState<NewComment>(initialComment);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment({
      ...comment,
      [event.target.name]: event.target.value,

    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await dispatch(addComment(comment));
    if (selectedPostId) {
      await dispatch(fetchCommentsByPostId(selectedPostId));
    }

    setComment(initialComment);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="NewCommentForm"
      method="post"
    >
      <div className="form-field">
        <input
          onChange={handleInputChange}
          value={comment.name}
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          onChange={handleInputChange}
          value={comment.email}
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          onChange={handleInputChange}
          value={comment.body}
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
