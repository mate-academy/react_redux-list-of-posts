import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPostComments,
  createPostComment,
  deletePostComment,
} from '../features/comments/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(fetchPostComments(post.id));
  }, [post.id, dispatch]);

  const addComment = async ({ name, email, body }: CommentData) => {
    await dispatch(
      createPostComment({
        name,
        email,
        body,
        postId: post.id,
      }),
    );
  };

  const deleteComment = async (commentId: number) => {
    await dispatch(deletePostComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!comments.loaded && <Loader />}

        {comments.loaded && comments.hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {comments.loaded &&
          !comments.hasError &&
          comments.items.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {comments.loaded && !comments.hasError && comments.items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.items.map(comment => (
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

        {comments.loaded && !comments.hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {comments.loaded && !comments.hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
