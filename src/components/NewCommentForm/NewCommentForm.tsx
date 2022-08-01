import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addComment } from '../../api/comments';
import { NewComment } from '../../react-app-env';
import { getSelectedPostId } from '../../store/selectors';
import './NewCommentForm.scss';

interface Props {
  loadComments: () => void,
}

export const NewCommentForm: React.FC<Props> = ({ loadComments }) => {
  const postId = useSelector(getSelectedPostId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment: NewComment = {
      postId,
      name,
      email,
      body,
    };

    await addComment(newComment);
    loadComments();
    clearForm();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
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
