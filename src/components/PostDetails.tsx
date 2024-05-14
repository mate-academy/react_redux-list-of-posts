import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchComments,
  addComment,
  removeComment,
  removeAllComments,
} from './commentsSlice/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const { comments, hasError, loaded } = useAppSelector(
    state => state.comments,
  );

  useEffect(() => {
    if (post.id) {
      dispatch(removeAllComments());
      dispatch(fetchComments(post.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id, post.userId]);

  const addCommentHadler = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      if (newComment) {
        dispatch(addComment(newComment));
      }
    } catch (e) {
      throw new Error(JSON.stringify(e));
    }
  };

  const deleteComment = async (commentId: number) => {
    dispatch(removeComment(commentId));

    await commentsApi.deleteComment(commentId);
  };

  const loading = !loaded && !hasError;
  const error = !loaded && hasError;
  const noComments = loaded && !hasError && !comments.length;
  const showComments = loaded && !hasError && !!comments.length;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {noComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {showComments && (
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
          <NewCommentForm onSubmit={addCommentHadler} />
        )}
      </div>
    </div>
  );
};
