import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentActions from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const { setSelectedPost } = useAppSelector(state => state.author);
  const {
    comments,
    hasError,
    loaded,
    visible,
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  function loadComments() {
    if (setSelectedPost) {
      dispatch(commentActions.init(setSelectedPost.id));
    }
  }

  useEffect(() => {
    loadComments();
  }, [setSelectedPost?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (setSelectedPost) {
      const newComment = {
        name,
        email,
        body,
        postId: setSelectedPost?.id,
      };

      dispatch(commentActions.addComment(newComment));
    }
  };

  const deleteComment = (commentId: number) => {
    dispatch(commentActions.removeComment(commentId));
    dispatch(commentActions.actions.setCommentId(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${setSelectedPost?.id}: ${setSelectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {setSelectedPost?.body}
        </p>
      </div>

      <div className="block">
        {loaded && (
          <Loader />
        )}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loaded && !hasError && !!comments.length && (
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

        {!loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => {
              dispatch(commentActions.actions.setVisible(true));
            }}
          >
            Write a comment
          </button>
        )}

        {!loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
