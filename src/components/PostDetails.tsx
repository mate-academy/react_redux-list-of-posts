import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import * as commentsActions from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { items, loaded, hasError } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  function loadComments() {
    setVisible(false);
    if (selectedPost) {
      dispatch(commentsActions.init(selectedPost?.id));
    }
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
    try {
      if (selectedPost) {
        const newComment = await commentsApi.createComment({
          name,
          email,
          body,
          postId: selectedPost.id,
        });

        dispatch(commentsActions.set([...items, newComment]));
      }

      // setComments([...comments, newComment]);
      // works wrong if we wrap `addComment` with `useCallback`
      // because it takes the `comments` cached during the first render
      // not the actual ones
    } catch (error) {
      // we show an error message in case of any error
      dispatch(commentsActions.setError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    dispatch(commentsActions.set(items.filter(
      comment => comment.id !== commentId,
    )));

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

        {loaded && !hasError && !items.length && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && !!items.length && (
          <>
            <p className="title is-4">Comments:</p>

            {items.map(comment => (
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
