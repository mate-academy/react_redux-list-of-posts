import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useAppDispatch } from '../app/hooks';
import {
  clearComments,
  fetchComments,
  addComment as addCommentAction,
  deleteComment as deleteCommentAction,
} from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const [actionError, setActionError] = useState(false);
  const {
    items: comments,
    loaded,
    hasError,
  } = useSelector((state: RootState) => state.comments);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(post.id));

    return () => {
      dispatch(clearComments());
    };
  }, [dispatch, post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    setActionError(false);
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(addCommentAction(newComment));

      // setComments([...comments, newComment]);
      // works wrong if we wrap `addComment` with `useCallback`
      // because it takes the `comments` cached during the first render
      // not the actual ones
    } catch {
      // we show an error message in case of any error
      setActionError(true);
    }
  };

  const deleteComment = async (commentId: number) => {
    setActionError(false);
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    try {
      dispatch(deleteCommentAction(commentId));

      await commentsApi.deleteComment(commentId);
    } catch {
      setActionError(true);
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

        {actionError && (
          <div className="notification is-danger" data-cy="ActionError">
            Something went wrong. Try again
          </div>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
