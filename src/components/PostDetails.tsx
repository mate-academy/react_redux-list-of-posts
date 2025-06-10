import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { actions as commentActions } from '../features/commentSlice';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { loaded, hasError, visible, comments } = useSelector(
    (state: RootState) => state.comments,
  );
  const currentComments = useSelector(
    (state: RootState) => state.comments.comments,
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
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(commentActions.setComments([...currentComments, newComment]));

      // setComments([...comments, newComment]);
      // works wrong if we wrap `addComment` with `useCallback`
      // because it takes the `comments` cached during the first render
      // not the actual ones
    } catch (error) {
      // we show an error message in case of any error
      dispatch(commentActions.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    // eslint-disable-next-line max-len
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

            {comments.map((comment: Comment) => (
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
