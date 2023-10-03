import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeComment,
} from '../app/slices/commentsSlice';
import { CommentData } from '../types/Comment';
import {
  deleteComment,
  loadComments,
  postComment,
} from '../app/thunks/commentsThunk';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const {
    comments,
    isLoading,
    hasError,
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (post) {
      dispatch(loadComments(post.id));
    }

    setVisible(false);
  }, [post.id]);

  const handleDeleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));

    dispatch(deleteComment(commentId));
  };

  const handleAddComment = async ({ name, email, body }: CommentData) => {
    const data = {
      name,
      email,
      body,
      postId: post?.id as number,
    };

    await dispatch(postComment(data));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {isLoading && (
          <Loader />
        )}

        {isLoading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !hasError && comments.length > 0 && (
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

        {!isLoading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !hasError && visible && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
