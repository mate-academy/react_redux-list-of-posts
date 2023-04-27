import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import * as commentActions from '../features/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const {
    commentsList,
    hasError,
    loading,
  } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(commentActions.getCommentsById(post.id));
  }, [post]);

  const addComment = async ({ name, email, body }: CommentData) => {
    await dispatch(commentActions.createNewComment({
      name,
      email,
      body,
      postId: post.id,
    }));
  };

  const deleteComment = (commentId: number) => {
    dispatch(commentActions.deleteExistingComment(commentId));
    dispatch(commentActions.removeComment(commentId));
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
        {loading && (
          <Loader />
        )}

        {!loading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !hasError && commentsList.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !hasError && commentsList.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {commentsList.map(comment => (
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

        {!loading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
