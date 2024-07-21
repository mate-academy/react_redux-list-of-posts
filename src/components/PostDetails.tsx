import React, { memo, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/comments';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';

export const PostDetails: React.FC = memo(function PostDetailsComponent() {
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.posts);
  const { comments, loading, hasError, visibleForm } = useAppSelector(
    state => state.comments,
  );

  const deletedComment = useCallback(
    (commentId: number) => {
      dispatch(commentsActions.setDeleteComment(commentId));
      dispatch(commentsActions.deleteComment(commentId));
    },
    [dispatch],
  );

  const createComment = useCallback(
    async ({ name, email, body }: CommentData) => {
      dispatch(
        commentsActions.createComment({
          name,
          email,
          body,
          id: 0,
          postId: selectedPost?.id || 0,
        }),
      );
    },
    [dispatch, selectedPost?.id],
  );

  useEffect(() => {
    if (selectedPost?.id) {
      dispatch(commentsActions.fetchComments(selectedPost.id));
    }
  }, [dispatch, selectedPost?.id]);

  const show = {
    commentsError: !loading && hasError,
    comments: !loading && !hasError && !!comments.length,
    noComments: !loading && !hasError && !comments.length,
    buttonWriteComment: !loading && !hasError && !visibleForm,
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {show.commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {show.comments && (
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
                    onClick={() => deletedComment(comment.id)}
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

        {show.noComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {show.buttonWriteComment && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(commentsActions.setVisibleForm(true))}
          >
            Write a comment
          </button>
        )}

        {visibleForm && <NewCommentForm onSubmit={createComment} />}
      </div>
    </div>
  );
});
