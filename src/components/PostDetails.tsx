import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  deleteComment,
  loadComments,
  selectCommentsByPostId,
  selectCommentsError,
  selectCommentsLoading,
  selectIsCommentFormVisibleForPost,
  showCommentForm,
} from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(selectCommentsByPostId(post.id));
  const loading = useAppSelector(selectCommentsLoading);
  const hasError = useAppSelector(selectCommentsError);
  const visible = useAppSelector(selectIsCommentFormVisibleForPost(post.id));

  useEffect(() => {
    if (!post) {
      return;
    }

    dispatch(loadComments(post.id));
  }, [dispatch, post, post.id]);

  const handleAddComment = async (data: CommentData) => {
    await dispatch(addComment({ postId: post.id, data }));
  };

  const handleDeleteComment = async (commentId: number) => {
    await dispatch(deleteComment({ postId: post.id, commentId }));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !hasError && comments.length > 0 && (
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

        {!loading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(showCommentForm(post.id))}
          >
            Write a comment
          </button>
        )}

        {!loading && !hasError && visible && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
