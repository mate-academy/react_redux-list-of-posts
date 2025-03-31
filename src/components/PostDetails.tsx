import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadComments, addComment, deleteComment } from '../features/comments';
import { setVisibility } from '../features/newCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { comments, loading, error } = useAppSelector(state => state.commets);
  const dispatch = useAppDispatch();
  const visible = useAppSelector(state => state.newCommentForm.visible);

  useEffect(() => {
    dispatch(setVisibility(false));
    dispatch(loadComments(post.id));
  }, [post.id, dispatch]);

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

  const addCommentFunction = async ({ name, email, body }: CommentData) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId: post.id,
    });

    dispatch(addComment(newComment));

    // works wrong if we wrap `addComment` with `useCallback`
    // because it takes the `comments` cached during the first render
    // not the actual ones
  };

  const deleteCommentFunction = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    // eslint-disable-next-line max-len

    dispatch(deleteComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !error && comments.length > 0 && (
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
                    onClick={() => deleteCommentFunction(comment.id)}
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

        {!loading && !error && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(setVisibility(true))}
          >
            Write a comment
          </button>
        )}

        {!loading && !error && visible && (
          <NewCommentForm onSubmit={addCommentFunction} />
        )}
      </div>
    </div>
  );
};
