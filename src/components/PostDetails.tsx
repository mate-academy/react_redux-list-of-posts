import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as commentsActions } from '../features/commentsSlice';

export const PostDetails = () => {
  const [visible, setVisible] = useState(false);
  const { comms, loaded, hasError } = useAppSelector(state => state.comments);
  const comments = comms;
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const post = selectedPost;

  function loadComments() {
    dispatch(commentsActions.setLoaded(false));
    dispatch(commentsActions.setHasError(false));
    setVisible(false);

    commentsApi
      .getPostComments(post?.id || 0)
      .then(commentsFromServer => {
        dispatch(commentsActions.set(commentsFromServer));
      })
      .catch(() => dispatch(commentsActions.setHasError(true))) // show an error when something went wrong
      .finally(() => dispatch(commentsActions.setLoaded(true))); // hide the spinner
  }

  useEffect(loadComments, [post?.id, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post?.id || 0,
      });

      dispatch(commentsActions.addComment(newComment));
    } catch (error) {
      dispatch(commentsActions.setHasError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.deleteComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {post ? `#${post.id}: ${post.title}` : 'Loading...'}
        </h2>

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
