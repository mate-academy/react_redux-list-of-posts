import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  deleteComment as deleteCommentAction,
} from '../features/comments';
import { CommentData } from '../types/Comment';
import { addCommentAsync } from '../features/comments';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { items, loaded, hasError } = useAppSelector(state => state.comments);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    dispatch(fetchComments(selectedPost.id));
  }, [selectedPost, dispatch]);

  const addComment = async (data: CommentData): Promise<void> => {
    if (!selectedPost) {
      return;
    }

    try {
      await dispatch(
        addCommentAsync({ postId: selectedPost.id, ...data }),
      ).unwrap();
    } catch (err) {}
  };

  const deleteComment = (id: number) => {
    dispatch(deleteCommentAction(id));
  };

  if (!selectedPost) {
    return <p>No post selected</p>;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>
        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {loaded && <Loader />}
        {!loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            {hasError}
          </div>
        )}
        {!loaded && !hasError && items.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {!loaded && !hasError && items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {items.map(comment => (
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
                  />
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

        {!loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
