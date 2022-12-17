import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { initComments, removeComment, actions as actionsComments }
  from '../features/comments/commentsSlice';
import { actions as actionsNewComment }
  from '../features/newFormComment/newFormCommentSlice';

export const PostDetails: React.FC = () => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { comments, loading, error } = useAppSelector(state => state.comments);
  const { visible } = useAppSelector(state => state.newFormComment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedPost) {
      dispatch(initComments(selectedPost.id));
    }

    dispatch(actionsNewComment.setVisible(false));
  }, [selectedPost?.id]);

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
        {loading && (
          <Loader />
        )}

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !error && comments.length > 0 && (
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
                    onClick={() => {
                      dispatch(removeComment(comment.id));
                      dispatch(actionsComments.setDeletedCommentId(comment.id));
                    }}
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

        {!loading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(actionsNewComment.setVisible(true))}
          >
            Write a comment
          </button>
        )}

        {!loading && !error && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
