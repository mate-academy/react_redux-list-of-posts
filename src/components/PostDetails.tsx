import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import {
  commentsListStates,
  actions as actionsComments,
} from '../features/commentsSlice';
import { selectedPostStates } from '../features/selectedPostSlice';

import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectedPostStates);
  const {
    loaded,
    hasError,
    visible,
    items: comments,
  } = useAppSelector(commentsListStates);
  const {
    setLoaded,
    setError,
    setVisible,
    setItems,
  } = actionsComments;
  const {
    id: postId,
    title: postTitle,
    body: postBody,
  } = post || {};

  function loadComments() {
    dispatch(setLoaded(false));
    dispatch(setError(false));
    dispatch(setVisible(false));

    const commentsLoading = (list: Comment[]) => {
      dispatch(setItems(list));
    };

    if (post) {
      commentsApi.getPostComments(post.id)
        .then(list => commentsLoading(list))
        .catch(() => dispatch(setError(true)))
        .finally(() => dispatch(setLoaded(true)));
    }
  }

  useEffect(loadComments, [post?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: postId || 0,
      });

      dispatch(actionsComments.setItems(
        [...comments, newComment],
      ));
    } catch (error) {
      dispatch(actionsComments.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(actionsComments.setItems(
      comments.filter(
        comment => comment.id !== commentId,
      ),
    ));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${postId}: ${postTitle}`}
        </h2>

        <p data-cy="PostBody">
          {postBody}
        </p>
      </div>

      <div className="block">
        {!loaded && (
          <Loader />
        )}

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
            onClick={() => dispatch(actionsComments.setVisible(true))}
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
