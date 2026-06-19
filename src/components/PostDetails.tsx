import React, { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  loadComments,
  removeComment,
} from '../features/comments/commentsSlice';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(state => state.comments);

  const [visible, setVisible] = useState(false);
  const [addCommentError, setAddCommentError] = useState(false);

  const showNoComments =
    comments.loaded && !comments.hasError && comments.items.length === 0;

  useEffect(() => {
    setVisible(false);
    setAddCommentError(false);
    dispatch(loadComments(post.id));
  }, [post.id, dispatch]);

  const handleAddComment = async (data: CommentData) => {
    setAddCommentError(false);

    try {
      await dispatch(
        addComment({
          ...data,
          postId: post.id,
        }),
      ).unwrap();
    } catch {
      setAddCommentError(true);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!comments.loaded && <Loader />}

        {comments.loaded && comments.hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {addCommentError && (
          <div className="notification is-danger">
            Failed to add comment. Please try again.
          </div>
        )}

        {showNoComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.loaded && !comments.hasError && comments.items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.items.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
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
                    onClick={() => dispatch(removeComment(comment))}
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

        {comments.loaded && !comments.hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {visible && <NewCommentForm onSubmit={handleAddComment} />}
    </div>
  );
};
