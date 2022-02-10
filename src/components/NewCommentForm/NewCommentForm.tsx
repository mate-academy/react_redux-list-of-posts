import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { addComment } from '../../store/reducers/commentReducer';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedPostId } = useTypedSelector(state => state.post);

  const [newComment, setNewComment] = useState<NewComment>({
    postId: selectedPostId,
    name: '',
    email: '',
    body: '',
  });

  useEffect(() => {
    setNewComment(current => ({
      ...current,
      postId: selectedPostId,
    }));
  }, [selectedPostId]);

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setNewComment(current => ({
      ...current,
      [name]: value as string,
    }));
  };

  const clearComment = () => {
    setNewComment({
      postId: selectedPostId,
      name: '',
      email: '',
      body: '',
    });
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addComment(newComment));
    clearComment();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleAddComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={newComment.name as string}
          onChange={handleChangeField}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={newComment.email as string}
          onChange={handleChangeField}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={newComment.body as string}
          onChange={handleChangeField}
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
