import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as commentsAction } from '../features/comments/commentsSlice';

export const PostDetails = () => {
  // const [comments, setComments] = useState<Comment[]>([]);
  // const [loaded, setLoaded] = useState(false);
  // const [hasError, setError] = useState(false);
  const { comment, loader, error } = useAppSelector(state => state.comments);
  const post = useAppSelector(state => state.selectedPost.selectedPost);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  function loadComments() {
    dispatch(commentsAction.clear());
    setVisible(false);

    if (post) {
      commentsApi
        .getPostComments(post.id)
        .then(commentsFromApi =>
          dispatch(commentsAction.setComments(commentsFromApi)),
        ) // save the loaded comments
        .catch(() => dispatch(commentsAction.setIsError(true))) // show an error when something went wrong
        .finally(() => dispatch(commentsAction.setIsLoading(true))); // hide the spinner
    }
  }

  useEffect(loadComments, [post, dispatch]);

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
        postId: post?.id || 0,
      });

      dispatch(commentsAction.setComments([...comment, newComment]));

      // setComments([...comments, newComment]);
      // works wrong if we wrap `addComment` with `useCallback`
      // because it takes the `comments` cached during the first render
      // not the actual ones
    } catch (e) {
      // we show an error message in case of any error
      dispatch(commentsAction.setIsError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    // eslint-disable-next-line max-len
    dispatch(
      commentsAction.setComments(comment.filter(item => item.id !== commentId)),
    );

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {!loader && <Loader />}

        {loader && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loader && !error && comment.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loader && !error && comment.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comment.map(com => (
              <article
                className="message is-small"
                key={com.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${com.email}`} data-cy="CommentAuthor">
                    {com.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(com.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {com.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loader && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loader && !error && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
