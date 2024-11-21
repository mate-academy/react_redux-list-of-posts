import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { initComments, initDeleteComment } from '../features/commentSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const selectedPost = useAppSelector(state => state.selectedPostReducer);
  const { comments, loaded, hasError } = useAppSelector(
    state => state.commentsReducer,
  );

  useEffect(() => {
    setVisible(false);

    if (selectedPost) {
      dispatch(initComments(selectedPost.id));
    }
  }, [dispatch, selectedPost]);

  const handleDeleteComment = (commentId: number) => {
    dispatch(initDeleteComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loaded && <Loader />}

        {!loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {selectedPost && !loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {selectedPost && !loaded && !hasError && comments.length > 0 && (
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
                    onClick={() => handleDeleteComment(comment.id)}
                  ></button>
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
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {selectedPost && !loaded && !hasError && visible && (
          <NewCommentForm postId={selectedPost.id} />
        )}
      </div>
    </div>
  );
};
