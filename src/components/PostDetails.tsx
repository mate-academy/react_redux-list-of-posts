import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { commentsSlice } from '../features/comments';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { comments, loaded, hasError } = useAppSelector(
    state => state.comments,
  );
  const selectedPost = useAppSelector(state => state.selectedPost);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    dispatch(commentsSlice.actions.setLoading(false));
    dispatch(commentsSlice.actions.setError(false));
    setVisible(false);

    commentsApi
      .getPostComments(selectedPost.id)
      .then(commentsFromServer =>
        dispatch(commentsSlice.actions.setComments(commentsFromServer)),
      )
      .catch(() => dispatch(commentsSlice.actions.setError(true)))
      .finally(() => dispatch(commentsSlice.actions.setLoading(true)));
  }, [dispatch, selectedPost]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      if (!selectedPost) {
        return;
      }

      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: selectedPost.id,
      });

      dispatch(commentsSlice.actions.addComment(newComment));
    } catch (error) {
      dispatch(commentsSlice.actions.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsSlice.actions.deleteComment(commentId));
    await commentsApi.deleteComment(commentId);
  };

  return (
    selectedPost && (
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {!loaded && <Loader />}

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
            <NewCommentForm onSubmit={addComment} />
          )}
        </div>
      </div>
    )
  );
};
