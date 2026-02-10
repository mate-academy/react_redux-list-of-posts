import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  commentsAsync,
  addNewCommentAsync,
  deleteCommentAsync,
} from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { comments, status } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);

    if (post.id) {
      dispatch(commentsAsync(post.id));
    }
  }, [post.id, dispatch]);

  const addComment = (data: Omit<CommentData, 'postId'>) => {
    dispatch(
      addNewCommentAsync({
        ...data,
        postId: post.id,
      }),
    );
  };

  const deleteComment = (commentId: number) => {
    dispatch(deleteCommentAsync(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {status.loadComments === 'loading' && <Loader />}

        {status.loadComments === 'failed' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {status.loadComments === 'idle' && !comments.length && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {status.loadComments === 'idle' && !!comments.length && (
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

        {status.loadComments === 'idle' && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {status.loadComments === 'idle' && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
