import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../store/showComments';
import './CommentForm.scss';

interface Props {
  postId: number,
}

const initialComment = {
  name: '',
  email: '',
  body: '',
};

export const CommentForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState(initialComment);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const onSuccess = () => setComment(initialComment);

    dispatch(addComment({ postId, ...comment }, onSuccess));
  };

  const changeFieldValue = ({ target }: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = target;

    setComment(prevComment => ({
      ...prevComment,
      [name]: value,
    }));
  };

  useEffect(() => {
    setComment(initialComment);
  }, [postId]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={comment.name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={changeFieldValue}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={comment.email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={changeFieldValue}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment.body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={changeFieldValue}
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
