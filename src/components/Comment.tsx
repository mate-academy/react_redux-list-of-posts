import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCommentFromPost } from '../store/posts';

type Props = {
  comment: Comment;
};

const Comment: React.FunctionComponent<Props> = ({ comment }) => {
  const dispatch = useDispatch();

  return (
    <section className="post__comment">
      <button
        type="button"
        className="button button--remove-comment"
        onClick={() => dispatch(removeCommentFromPost(comment.id))}
      >
        Remove
      </button>
      <p className="post__comment-body">{comment.body}</p>
      <div className="post__comment-author">
        <a href="/" className="post__comment-author-email">
          {comment.email}
        </a>
        <span className="post__comment-author-name">{comment.name}</span>
      </div>
    </section>
  );
};

export default Comment;
