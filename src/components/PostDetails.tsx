import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  deleteComment,
  fetchPostComments,
} from '../features/comments/commentsSlice';

export const PostDetails: React.FC = () => {
  const {
    items: comments,
    hasError,
    loaded,
  } = useAppSelector(state => state.comments);
  const post = useAppSelector(state => state.selectedPost.post);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  function loadComments() {
    // setLoaded(false);
    // setError(false);
    setVisible(false);

    if (post?.id) {
      dispatch(fetchPostComments(post.id));
    }

    // commentsApi
    //   .getPostComments(post.id)
    //   .then(setComments) // save the loaded comments
    //   .catch(() => setError(true)) // show an error when something went wrong
    //   .finally(() => setLoaded(true)); // hide the spinner
  }

  useEffect(loadComments, [post?.id, dispatch]);

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

  const deleteCommentHandler = (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    // eslint-disable-next-line max-len
    // setComments(currentComments =>
    //   currentComments.filter(comment => comment.id !== commentId),
    // );

    dispatch(deleteComment(commentId));
  };

  if (!post) {
    return null;
  }

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
                    onClick={() => deleteCommentHandler(comment.id)}
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

        {loaded && !hasError && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
