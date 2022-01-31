import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addComment } from '../../api/api';
import { addCommentAction } from '../../store/commentsReducer';
import { RootState } from '../../types/RootState';

export const NewComment:React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const selectedPost = useSelector((state:RootState) => state.postsReducer.selectedPost);

  const createComment = () => {
    if (!name.trim()) {
      setErrors([...errors, 'name']);

      return;
    }

    if (!body.trim()) {
      setErrors([...errors, 'body']);

      return;
    }

    if (errors.length === 0) {
      addComment(selectedPost, name, body);

      dispatch(
        addCommentAction({
          id: uuidv4(),
          postId: selectedPost,
          name,
          body,
        }),
      );

      setName('');
      setBody('');
    }
  };

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64" />
      </figure>
      <div className="media-content">
        <div className="field">
          <p className="control">
            <input
              type="text"
              className={classNames('input', {
                'is-danger': errors.includes('name'),
              })}
              placeholder="Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors(errors.filter(error => error !== 'name'));
              }}
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <textarea
              className={classNames('textarea', {
                'is-danger': errors.includes('body'),
              })}
              placeholder="Add a comment..."
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                setErrors(errors.filter(error => error !== 'body'));
              }}
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button
              type="button"
              className="button"
              onClick={createComment}
            >
              Send
            </button>
          </p>
        </div>
      </div>
    </article>
  );
};
