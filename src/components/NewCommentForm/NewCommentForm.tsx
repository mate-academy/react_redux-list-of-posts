import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPostComment, getPostComments } from '../../helpers/api';
import { LoadPostCommentsAction } from '../../store/actions';
import './NewCommentForm.scss';

type Props = {
  postId: number,
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const addNewComment = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    await addPostComment(postId, name, email, body);

    const postComments = await getPostComments(postId);

    dispatch(LoadPostCommentsAction(postComments));

    clearForm();
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={event => addNewComment(event)}
      >
        Add a comment
      </button>
    </form>
  );
};
