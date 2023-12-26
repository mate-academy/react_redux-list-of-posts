import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as commentsActions } from '../features/commentsSlice';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const {
    comments,
    isLoading,
    isError,
  } = useAppSelector(state => state.comments);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const [visible, setVisible] = useState(false);
  const post = selectedPost;

  useEffect(() => {
    const loadComments = () => {
      dispatch(commentsActions.setIsLoading(false));
      dispatch(commentsActions.setError(false));
      setVisible(false);

      commentsApi.getPostComments(selectedPost?.id || 0)
        .then(commentsFromServer => {
          dispatch(commentsActions.set(commentsFromServer));
        })
        .catch(() => {
          dispatch(commentsActions.setError(true));
        })
        .finally(() => {
          dispatch(commentsActions.setIsLoading(true));
        });
    };

    loadComments();
    dispatch(commentsActions.clearComments());
  }, [selectedPost?.id, dispatch]);

  // The same useEffect with async/await
  /*
  async function loadComments() {
    setLoaded(false);
    setVisible(false);
    setError(false);

    try {
      const commentsFromServer = await commentsApi.getPostComments(post.id);

      setComments(commentsFromServer);
    } catch (error) {
      setError(true);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  useEffect(loadComments, [post.id]); // Wrong!
  // effect can return only a function but not a Promise
  */

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const postId = post?.id || 0;

      if (postId !== undefined) {
        const newComment = await commentsApi.createComment({
          name,
          email,
          body,
          postId,
        });

        dispatch(commentsActions.add(newComment));
      }
    } catch {
      dispatch(commentsActions.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    dispatch(commentsActions.delete(commentId));

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
        {!isLoading && (
          <Loader />
        )}

        {isLoading && isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoading && !isError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoading && !isError && comments.length > 0 && (
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

        {isLoading && !isError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isLoading && !isError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
