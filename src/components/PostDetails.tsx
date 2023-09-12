import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as actionsComments from '../features/postsDetails/postsDetailsSlice';

type Props = {
  post: Post,
  hasError: boolean,
  setError: (value: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  post,
  hasError,
  setError,
}) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { comments, loadingComment } = useAppSelector(state => state.comments);

  const loadedComments = () => {
    dispatch(actionsComments.commentsThunk(post.id));
  };

  useEffect(loadedComments, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(actionsComments.setDetials([...comments, newComment]));
    } catch {
      setError(true);
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(actionsComments.setDetials(comments
      .filter(comment => comment.id !== commentId)));

    await commentsApi.deleteComment(commentId);
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
        {loadingComment === true && (
          <Loader />
        )}

        {loadingComment === false && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loadingComment === false && !hasError && comments.length > 0 && (
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

        {loadingComment === false && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loadingComment === false && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
