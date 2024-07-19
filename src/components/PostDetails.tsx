import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSelectedPost } from '../features/selectedPost/selectedPostSlice';
import {
  createComment,
  deleteComment,
  fetchCommentsByPostId,
  selectComments,
  selectCommentsStatus,
} from '../features/comments/commentsSlice';
import { HAS_ERROR, ITEMS, LOADED } from '../App';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const comments = useAppSelector(selectComments);
  const commentsStatus = useAppSelector(selectCommentsStatus);
  const selectedPost = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedPost) {
      dispatch(fetchCommentsByPostId(selectedPost.id));
    }
  }, [selectedPost, dispatch]);

  const handleAddComment = async ({ name, email, body }: CommentData) => {
    if (selectedPost) {
      dispatch(createComment({ name, email, body, postId: selectedPost.id }));
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {commentsStatus === ITEMS && <Loader />}

        {commentsStatus === HAS_ERROR && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {commentsStatus === LOADED && !comments.length && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {commentsStatus === LOADED && comments.length > 0 && (
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
                    onClick={() => dispatch(deleteComment(comment.id))}
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

        {commentsStatus === LOADED && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {commentsStatus === LOADED && visible && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
