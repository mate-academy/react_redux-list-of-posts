import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment as addCommentThunk,
  deleteComment as deleteCommentThunk,
  loadPostComments,
} from '../app/store/commentsSlice';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  post: Post;
};
export const PostDetails: React.FC<Props> = ({ post }) => {
  const comments: Comment[] = useAppSelector(state => state.comments.items);
  const loaded: boolean = useAppSelector(state => state.comments.loaded);
  const hasError: boolean = useAppSelector(state => state.comments.hasError);
  const [visible, setVisible] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setVisible(false);
    dispatch(loadPostComments(post.id));
  }, [dispatch, post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    setCommentError(null);
    try {
      const result = await dispatch(
        addCommentThunk({ name, email, body, postId: post.id }),
      );

      if (addCommentThunk.rejected.match(result)) {
        setCommentError('Failed to add comment.');
      }
    } catch {
      setCommentError('Failed to add comment.');
    }
  };

  const deleteComment = async (commentId: number) => {
    setCommentError(null);
    try {
      const result = await dispatch(deleteCommentThunk(commentId));

      if (deleteCommentThunk.rejected.match(result)) {
        setCommentError('Failed to delete comment.');
      }
    } catch {
      setCommentError('Failed to delete comment.');
    }
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

        {commentError && (
          <div className="notification is-danger" data-cy="CommentError">
            {commentError}
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
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
