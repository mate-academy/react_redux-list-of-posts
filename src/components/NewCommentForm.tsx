/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addComment } from '../slices/commentsSlice';

type Props = {
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addComment({ postId, name, email, body }));
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Author Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Author Email</label>
        <div className="control">
          <input
            className="input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Comment Text</label>
        <div className="control">
          <textarea
            className="textarea"
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            Add
          </button>
        </div>
        <div className="control">
          <button
            type="reset"
            className="button is-light"
            onClick={() => {
              setName('');
              setEmail('');
              setBody('');
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
