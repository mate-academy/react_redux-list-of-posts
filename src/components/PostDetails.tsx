import { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsActions from '../features/comments';

import * as commentsApi from '../api/comments';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const PostDetails = () => {
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { comments, loading, error, visible } = useAppSelector(
    state => state.comments,
  );
  const dispatch = useAppDispatch();

  function loadComments() {
    if (selectedPost?.id) {
      dispatch(commentsActions.init(selectedPost?.id));
    }
  }

  useEffect(loadComments, [selectedPost?.id, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      if (selectedPost?.id !== undefined) {
        const newComment = await commentsApi.createComment({
          name,
          email,
          body,
          postId: selectedPost.id,
        });

        dispatch(commentsActions.addComment(newComment));
      } else {
        throw new Error('Selected post is undefined');
      }
    } catch (hasError) {
      dispatch(commentsActions.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.deleteComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <>
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>
          <p data-cy="PostBody">{selectedPost?.body}</p>
        </>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && selectedPost?.id && comments.length === 0 && !error && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !error && selectedPost?.id && comments.length > 0 && (
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

        {!loading && selectedPost?.id && !visible && !error && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(commentsActions.setVisible(true))}
          >
            Write a comment
          </button>
        )}

        {!loading && selectedPost?.id && !error && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
