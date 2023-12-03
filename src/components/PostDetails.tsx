import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

// import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchComments, postComment, deleteComment } from '../utils/thunks';
import { removeComment } from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const {
    comments,
    isLoading,
    hasError,
  } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  function loadComments() {
    // setLoaded(false);
    // setError(false);
    setVisible(false);

    if (post) {
      dispatch(fetchComments(post.id));
    }
  }

  useEffect(() => {
    loadComments();
  }, [post.id]);

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
    const data = {
      name,
      email,
      body,
      postId: post?.id as number,
    };

    await dispatch(postComment(data));
  };

  const doDeleteComment = async (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    dispatch(removeComment(commentId));
    dispatch(deleteComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>
        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {isLoading && (
          <Loader />
        )}

        {!isLoading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !hasError && comments.length > 0 && (
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
                    onClick={() => doDeleteComment(comment.id)}
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

        {!isLoading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
