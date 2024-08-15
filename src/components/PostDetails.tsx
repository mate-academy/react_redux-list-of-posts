import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

//import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  fetchComments,
  removeComment,
  resetError,
  resetLoader,
  takeComment,
} from '../app/features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const { items, loaded, hasError } = useAppSelector(state => state.comments);

  const [visible, setVisible] = useState(false);

  function loadComments() {
    dispatch(resetLoader(false));
    dispatch(resetError(false));
    setVisible(false);

    dispatch(fetchComments(post.id));

    // commentsApi
    //   .getPostComments(post.id)
    //   .then(setComments) // save the loaded comments
    //   .catch(() => setError(true)) // show an error when something went wrong
    //   .finally(() => setLoaded(true)); // hide the spinner
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadComments, [post.id]);

  const addNewComment = async ({ name, email, body }: CommentData) => {
    await dispatch(addComment({ name, email, body, postId: post.id, id: 0 }));
  };

  const deleteComment = async (commentId: number) => {
    dispatch(takeComment(commentId));
    dispatch(removeComment(commentId));
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
          <NewCommentForm onSubmit={addNewComment} />
        )}
      </div>
    </div>
  );
};
