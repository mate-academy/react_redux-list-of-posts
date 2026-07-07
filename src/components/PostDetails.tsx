import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useDispatch, useSelector } from 'react-redux';
import * as commentsApi from '../api/comments';
import {
  setCommentsError,
  setCommentsLoaded,
} from '../features/counter/AppSlice';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { RootState } from '../app/store';
import { setComments } from '../features/counter/AppSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const comments = useSelector((state: RootState) => state.app.comments.items);
  const loaded = useSelector((state: RootState) => state.app.comments.loaded);
  const hasError = useSelector(
    (state: RootState) => state.app.comments.hasError,
  );
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  function loadComments() {
    dispatch(setCommentsLoaded(false));
    dispatch(setCommentsError(false));
    setVisible(false);

    commentsApi
      .getPostComments(post.id)
      .then(postComments => dispatch(setComments(postComments)))
      .catch(() => dispatch(setCommentsError(true)))
      .finally(() => dispatch(setCommentsLoaded(true)));
  }

  useEffect(loadComments, [post.id, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });
      dispatch(setComments([...comments, newComment]));
    } catch (error) {
      dispatch(setCommentsError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    // eslint-disable-next-line max-len
    dispatch(setComments(comments.filter(comment => comment.id !== commentId)));

    await commentsApi.deleteComment(commentId);
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
