import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/commentSlice';

export const PostDetails = () => {
  const { comments, loaded, hasError, visible } = useAppSelector(
    state => state.comments,
  );
  const post = useAppSelector(state => state.selectedPost.selectedPost);
  const dispatch = useAppDispatch();

  const selectedPostId = post?.id;

  function loadComments() {
    dispatch(commentsActions.initComments(selectedPostId as number));
  }

  const onChangeVisible = () => dispatch(commentsActions.setVisible(!visible));

  useEffect(() => {
    if (visible) {
      dispatch(commentsActions.setVisible(false));
    }

    loadComments();
  }, [selectedPostId]);

  const addComment = async ({ name, email, body }: CommentData) => {
    dispatch(
      commentsActions.createComment({
        name,
        email,
        body,
        postId: post?.id as number,
      }),
    );
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.deleteComment(commentId));
    await commentsApi.deleteComment(commentId);
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
            onClick={onChangeVisible}
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
