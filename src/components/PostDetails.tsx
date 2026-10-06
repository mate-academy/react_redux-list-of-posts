import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { CommentData } from '../types/Comment';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchComments, deletePostComment } from '../features/comments';
import { clearComments, addComment } from '../features/comments';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    if (selectedPost) {
      dispatch(fetchComments(selectedPost?.id));
    }

    return () => {
      dispatch(clearComments());
    };
  }, [dispatch, selectedPost]);

  const handleAddComment = async (commentData: CommentData) => {
    if (selectedPost) {
      await dispatch(
        addComment({ ...commentData, postId: selectedPost.id }),
      ).unwrap();
    }
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deletePostComment(commentId));
  };

  if (!selectedPost) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {!loaded && !hasError && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && (
          <>
            {comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <article
                    className="message is-small"
                    key={comment.id}
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>

                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(comment.id)}
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
            {!visible ? (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setVisible(true)}
              >
                Write a comment
              </button>
            ) : (
              <NewCommentForm onSubmit={handleAddComment} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
