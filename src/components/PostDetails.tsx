import React, { useEffect, useState, useCallback } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPostComments,
  createComment,
  deleteComment,
} from '../features/comments/commentsSlice';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isCommentFormVisible, setCommentFormVisible] = useState(false);

  const { comments, loaded, hasError } = useAppSelector(
    state => state.comments,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCommentFormVisible(false);
    dispatch(fetchPostComments(post.id));
  }, [post.id, dispatch]);

  const handleAddComment = useCallback(
    async ({ name, email, body }: CommentData) => {
      try {
        await dispatch(
          createComment({
            name,
            email,
            body,
            postId: post.id,
          }),
        ).unwrap();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to create comment:', error);
      }
    },
    [dispatch, post.id],
  );

  const handleDeleteComment = useCallback(
    (commentId: number) => {
      dispatch(deleteComment(commentId));
    },
    [dispatch],
  );

  const renderCommentsContent = () => {
    if (!loaded) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
    }

    if (comments.length === 0) {
      return (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      );
    }

    return (
      <>
        <p className="title is-4">Comments:</p>

        {comments.map((comment: Comment) => (
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
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {renderCommentsContent()}

        {loaded && !hasError && !isCommentFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setCommentFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && isCommentFormVisible && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
