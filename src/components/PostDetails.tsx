import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { postSelector } from '../features/postStateSllice';
import {
  fetchCommentsByPostId,
  fetchNewComment,
  removeComment,
  removeCommentFromServer,
  selectComments,
} from '../features/commentsStateSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(postSelector);
  const {
    comments,
    isCommentsLoaded,
    hasError,
  } = useAppSelector(selectComments);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (post) {
      dispatch(fetchCommentsByPostId(post.id));
    }
  }, [post?.id]);

  const addComment = ({ name, email, body }: CommentData) => {
    // try {
    if (post) {
      const newComment = {
        name,
        email,
        body,
        postId: post.id,
      };

      dispatch(fetchNewComment(newComment));
    }
  };

  const deleteComment = (commentId: number) => {
    dispatch(removeComment(commentId));

    dispatch(removeCommentFromServer(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      {post && (
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>
      )}

      <div className="block">
        {!isCommentsLoaded && (
          <Loader />
        )}

        {isCommentsLoaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isCommentsLoaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isCommentsLoaded && !hasError && comments.length > 0 && (
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
                    onClick={() => deleteComment(comment.id)}
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

        {isCommentsLoaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isCommentsLoaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
