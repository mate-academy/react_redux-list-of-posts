import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { actions as commentActions } from '../app/reducers/commentSlice';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';

import { RootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state: RootState) => state.comment.items);
  const loaded = useAppSelector((state: RootState) => state.comment.loaded);
  const hasError = useAppSelector((state: RootState) => state.comment.hasError);
  const visible = useAppSelector((state: RootState) => state.comment.visible);
  const currentComments = useAppSelector(
    (state: RootState) => state.comment.items,
  );

  function loadComments() {
    dispatch(commentActions.setLoaded(false));
    dispatch(commentActions.setError(false));
    dispatch(commentActions.setVisible(false));

    commentsApi
      .getPostComments(post.id)
      .then(comment => dispatch(commentActions.setComments(comment))) // save the loaded comments
      .catch(() => dispatch(commentActions.setError(true))) // show an error when something went wrong
      .finally(() => dispatch(commentActions.setLoaded(true))); // hide the spinner
  }

  useEffect(loadComments, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment: Comment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      }); // we use a timestamp as an ID;

    dispatch(commentActions.setComments([...currentComments, newComment]));
    } catch (error) {
      dispatch(commentActions.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(
      commentActions.setComments(
        currentComments.filter(comment => comment.id !== commentId),
      ),
    );

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
            onClick={() => dispatch(commentActions.setVisible(true))}
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
