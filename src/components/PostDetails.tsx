import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import * as commentsActions from '../features/commentsSlice';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const {
    loaded,
    hasError,
    items: comments,
  } = useAppSelector(state => state.comments);
  const { selectedPost: post } = useAppSelector(state => state.selectedPost);
  const selectedPostId = post?.id;

  const [visible, setVisible] = useState(false);

  function loadComments() {
    setVisible(false);
    if (selectedPostId !== undefined) {
      dispatch(commentsActions.init(selectedPostId));
    }
  }

  useEffect(loadComments, [selectedPostId, dispatch]);
  if (selectedPostId === undefined) {
    return;
  }

  const addComment = async ({ name, email, body }: CommentData) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId: selectedPostId,
    });

    dispatch(commentsActions.addComment(newComment));
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.deleteComment(commentId));

    try {
      await commentsApi.deleteComment(commentId);
    } catch (error) {}
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
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
