import React, { useState } from 'react';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';

type Props = {
  post: Post;
  comments: Comment[];
  onDeleteComment: (commentId: number) => void; // Add this prop
  onAddComment: (comment: Comment) => void; // Add this prop
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  onDeleteComment,
  onAddComment,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => onDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {visible && <NewCommentForm onSubmit={onAddComment} />}
      </div>
    </div>
  );
};
