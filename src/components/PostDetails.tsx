import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Comment, CommentData } from '../types/Comment';
import { useSelector } from 'react-redux';
import { selectSelectedPost } from '../features/selectedPost/selectedPostSlice';
import { useAppDispatch } from '../app/hooks';
import {
  loadPostComments,
  selectComments,
  setHasError,
  setLoaded,
} from '../features/comments/commentsSlice';

export const PostDetails: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [visible, setVisible] = useState(false);
  const { selectedPost } = useSelector(selectSelectedPost);
  const { loaded, hasError } = useSelector(selectComments);
  const dispatch = useAppDispatch();

  function loadComments() {
    dispatch(setLoaded(false));
    dispatch(setHasError(false));
    setVisible(false);

    if (selectedPost) {
      dispatch(loadPostComments(selectedPost?.id));
    }
  }

  useEffect(loadComments, [dispatch, selectedPost]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      if (selectedPost) {
        const newComment = await commentsApi.createComment({
          name,
          email,
          body,
          postId: selectedPost.id,
        });

        setComments(currentComments => [...currentComments, newComment]);
      }

      // setComments([...comments, newComment]);
      // works wrong if we wrap `addComment` with `useCallback`
      // because it takes the `comments` cached during the first render
      // not the actual ones
    } catch (error) {
      // we show an error message in case of any error
      dispatch(setHasError(true));
    }
  };

  const deleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    // eslint-disable-next-line max-len
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
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
