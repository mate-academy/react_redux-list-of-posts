import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  deleteComment,
  fetchCommentsByPost,
} from '../features/comments/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const hasError = useAppSelector(state => state.comments.hasError);
  const loaded = useAppSelector(state => state.comments.loaded);
  const post = useAppSelector(state => state.selectedPost) as Post;
  const comments = useAppSelector(state => state.comments.items) as Comment[];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommentsByPost(post.id));
    setVisible(false);
  }, [post.id, dispatch]);

  const handleAddComment = async (data: {
    name: string;
    email: string;
    body: string;
  }) => {
    await dispatch(addComment({ postId: post.id, data }));
  };

  const handleDeleteComment = async (commentId: number) => {
    await dispatch(deleteComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loaded && <Loader />}

        {!loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loaded && !hasError && comments.length > 0 && (
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
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loaded && !hasError && visible && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
