import React, { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  addCommentAsync,
  deleteCommentAsync,
  getCommentsAsync,
  removeComment,
} from '../features/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const comments = useAppSelector((state) => state.comments.comments);
  const commentsStatus = useAppSelector((state) => state.comments.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setVisible(false);
    dispatch(getCommentsAsync(post.id));
  }, [post.id]);

  const addNewComment = async ({ name, email, body }: CommentData) => {
    const newComment: Comment = {
      id: +new Date(),
      name,
      email,
      body,
      postId: post.id,
    };

    await dispatch(addCommentAsync(newComment));
    dispatch(addComment(newComment));
  };

  const deleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));
    dispatch(deleteCommentAsync(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {commentsStatus === 'loading' && <Loader />}

        {commentsStatus === 'failed' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {commentsStatus === 'idle' && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {commentsStatus === 'idle' && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map((comment) => (
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

        {commentsStatus === 'idle' && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {commentsStatus === 'idle' && visible && (
          <NewCommentForm onSubmit={addNewComment} />
        )}
      </div>
    </div>
  );
};
