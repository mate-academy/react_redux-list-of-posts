import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  deleteComment,
} from '../features/comments/commentsSlice';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.selectedPost);
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  // Requirement: Local state for form/comment visibility
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (post) {
      setVisible(false);
      dispatch(fetchComments(post.id));
    }
  }, [post, dispatch]);

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!loaded && !hasError && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
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
                    onClick={() => dispatch(deleteComment(comment.id))}
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

        {!visible && loaded && !hasError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {visible && <NewCommentForm postId={post.id} />}
    </div>
  );
};
