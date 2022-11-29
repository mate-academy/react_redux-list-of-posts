import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  setComments,
  setCommentsError,
  setCommentsLoading,
} from '../features/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const { comments, loaded, hasError }
    = useAppSelector(state => state.comments);
  const selectedPost
    = useAppSelector<Post | null>(state => state.selectPost.selectedPost);
  const [visible, setVisible] = useState(false);

  function loadComments() {
    if (!selectedPost) {
      return;
    }

    setVisible(false);

    commentsApi.getPostComments(selectedPost.id)
      .then(data => dispatch(setComments(data))) // save the loaded comments
      .catch(() => dispatch(setCommentsError(true))) // show an error when something went wrong
      .finally(() => dispatch(setCommentsLoading(true))); // hide the spinner
  }

  useEffect(loadComments, [selectedPost?.id]);

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
    if (!selectedPost) {
      return;
    }

    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: selectedPost.id,
      });

      dispatch(setComments(
        [...comments, newComment],
      ));

      // setComments([...comments, newComment]);
      // works wrong if we wrap `addComment` with `useCallback`
      // because it takes the `comments` cached during the first render
      // not the actual ones
    } catch (error) {
      // we show an error message in case of any error
      dispatch(setCommentsError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    dispatch(setComments(
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
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
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
