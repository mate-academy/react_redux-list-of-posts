import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  deleteSomeComment,
  setComments,
  setError,
  setLoaded,
} from '../features/comments/commentsSlice';
import { CommentData } from '../types/Comment';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments.items);
  const post = useAppSelector(state => state.selectedPost.selectedPost);
  const loaded = useAppSelector(state => state.comments.loaded);
  const hasError = useAppSelector(state => state.comments.hasError);

  const [visible, setVisible] = useState(false);
  const postId = post?.id;

  useEffect(() => {
    if (!postId) {
      return;
    }

    const loadComments = async () => {
      dispatch(setLoaded(false));
      dispatch(setError(false));
      setVisible(false);

      try {
        const commentsFromApi = await commentsApi.getPostComments(postId);

        dispatch(setComments(commentsFromApi));
      } catch {
        dispatch(setError(true));
      } finally {
        dispatch(setLoaded(true));
      }
    };

    loadComments();
  }, [dispatch, postId]);

  if (!post) {
    return <Loader />;
  }

  const handleAddComment = async ({
    name,
    email,
    body,
  }: CommentData): Promise<void> => {
    if (!postId) {
      return; // okay, void
    }

    try {
      await dispatch(addComment({ name, email, body, postId })).unwrap();
    } catch {
      dispatch(setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(setComments(comments.filter(c => c.id !== commentId)));

    try {
      await dispatch(deleteSomeComment(commentId));
    } catch {
      dispatch(setError(true));
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${postId}: ${post.title}`}</h2>
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
