import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchComments, deleteCommentAsync } from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.post.value);
  const { comments, isLoaded, hasError }
    = useAppSelector(state => state.comments);

  function loadComments() {
    setIsVisible(false);
    if (post) {
      dispatch(fetchComments(post.id));
    }
  }

  useEffect(loadComments, [post?.id]);

  const handleCommentFormShow = () => {
    setIsVisible(true)
  }

  const handleCommentDelete = (commentId: number) => {
    dispatch(deleteCommentAsync(commentId))
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
        </p>
      </div>

      <div className="block">
        {!isLoaded && (
          <Loader />
        )}

        {isLoaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoaded && !hasError && comments.length > 0 && (
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
                    onClick={() => handleCommentDelete(comment.id)}
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

        {isLoaded && !hasError && !isVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleCommentFormShow}
          >
            Write a comment
          </button>
        )}

        {isLoaded && !hasError && isVisible && (
          <NewCommentForm post={post} />
        )}
      </div>
    </div>
  );
};
