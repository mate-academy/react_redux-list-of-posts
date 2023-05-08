import React, { useEffect, useState } from 'react';
import { deleteComment } from '../api/comments';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPostComments, setCommentsAfterDelete,
} from '../features/comments/commentsSlice';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  const [commentIdDeleteError, setCommentIdDeleteError] = useState(0);
  const [visible, setVisible] = useState(false);
  const {
    loaded, hasError, comments,
  } = useAppSelector(state => state.comments);
  const { selectedPost } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  function getPostComments(postId: number) {
    dispatch(fetchPostComments(postId));
  }

  useEffect(() => {
    if (selectedPost) {
      getPostComments(selectedPost.id);
      setVisible(false);
    }
  }, [selectedPost?.id]);

  const deletePostComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        dispatch(setCommentsAfterDelete(commentId));
      })
      .catch(() => {
        setCommentIdDeleteError(commentId);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCommentIdDeleteError(0);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [commentIdDeleteError]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <div className="block">
        {!loaded && (
          <Loader />
        )}

        {loaded && hasError && (
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
              <>
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
                      onClick={() => deletePostComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>

                {commentIdDeleteError === comment.id && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    Something went wrong
                  </div>
                )}
              </>
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
