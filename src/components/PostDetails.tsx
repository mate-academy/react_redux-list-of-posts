import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { RootState, AppDispatch } from '../app/store';
import {
  fetchCommentsByPost,
  postComment,
  deleteCommentOptimistic,
  deleteCommentRequest,
} from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const postId = useSelector((s: RootState) => s.selectedPost.id);
  const posts = useSelector((s: RootState) => s.posts.items);
  const commentsState = useSelector((s: RootState) => s.comments);

  const [visible, setVisible] = useState(false);

  const post = posts.find(p => p.id === postId);

  // завантаження коментарів при зміні postId
  useEffect(() => {
    if (postId != null) {
      dispatch(fetchCommentsByPost(postId));
      setVisible(false); // ховаємо форму при зміні поста
    }
  }, [dispatch, postId]);

  if (!post) return null;

  const addComment = async ({ name, email, body }: { name: string; email: string; body: string }) => {
    await dispatch(postComment({ name, email, body, postId } as any)).unwrap();
  };

  const deleteComment = (commentId: number) => {
    // оптимістично прибираємо
    dispatch(deleteCommentOptimistic(commentId));
    // відправляємо запит
    dispatch(deleteCommentRequest(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!commentsState.loaded && !commentsState.hasError && <Loader />}

        {commentsState.loaded && commentsState.hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {commentsState.loaded && !commentsState.hasError && commentsState.items.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {commentsState.loaded && !commentsState.hasError && commentsState.items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {commentsState.items.map(comment => (
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

        {commentsState.loaded && !commentsState.hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {commentsState.loaded && !commentsState.hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
