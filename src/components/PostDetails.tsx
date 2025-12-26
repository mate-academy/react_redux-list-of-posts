import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  addComment,
  deleteComment,
} from '../store/commentsSlice';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  // ✅ estado local APENAS para UI
  const [visible, setVisible] = useState(false);

  // Redux
  const dispatch = useAppDispatch();
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  // carregar comentários ao trocar o post
  useEffect(() => {
    dispatch(fetchComments(post.id));
    setVisible(false);
  }, [dispatch, post.id]);

  const handleAddComment = (data: CommentData) => {
    return dispatch(addComment({ ...data, postId: post.id })).unwrap();
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
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
                    onClick={() => handleDeleteComment(comment.id)}
                  />
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
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
