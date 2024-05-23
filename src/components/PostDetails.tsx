import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsActions from '../features/commentsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails = () => {
  const [visible, setVisible] = useState(false);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { comments, error, loading } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  const noCommentsMessage = !loading && !error && !comments.length;
  const visibleComments = !loading && !error && !!comments.length;
  const visibleCommentForm = !loading && !error && visible;
  const hiddenCommentForm = !loading && !error && !visible;

  function loadComments() {
    setVisible(false);
    if (selectedPost) {
      dispatch(commentsActions.fetchComments(selectedPost.id));
    }
  }

  useEffect(loadComments, [selectedPost]);

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.actions.delete(commentId));

    await dispatch(commentsActions.removeComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {noCommentsMessage && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {visibleComments && (
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

        {hiddenCommentForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {visibleCommentForm && <NewCommentForm />}
      </div>
    </div>
  );
};
