import { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';
import { CommentData } from '../types/Comment';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import { actions as commentsActions } from '../features/comments/commentsSlice';
import { getPostCommnetsThunk } from '../thunks/CommentsThunks';

export const PostDetails = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { post } = useAppSelector(state => state.posts);
  const { comments, loading, error } = useAppSelector(state => state.comments);

  function loadComments() {
    setVisible(false);

    if (post) {
      dispatch(getPostCommnetsThunk(post?.id));
    }
  }

  useEffect(loadComments, [post?.id, post, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post?.id || 0,
      });

      dispatch(commentsActions.setComments(
        comments ? [...comments, newComment] : comments,
      ));
    } catch (err) {
      dispatch(commentsActions.commentError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.setComments(
      comments ? comments.filter(
        comment => comment.id !== commentId,
      ) : comments,
    ));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
        </p>
      </div>

      <div className="block">
        {!loading && (
          <Loader />
        )}

        {loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loading && !error && comments.length > 0 && (
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

        {loading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loading && !error && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
