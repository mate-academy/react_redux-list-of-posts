import React, { useEffect } from 'react';

import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/comments/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { comments, isCommentsLoading, visible, hasError } = useAppSelector(
    state => state.comments,
  );

  useEffect(() => {
    dispatch(commentsActions.initComments(post.id));
  }, [post.id, dispatch]);

  const addComment = ({ name, email, body }: CommentData) => {
    const newComment = {
      name,
      email,
      body,
      postId: post.id,
    };

    dispatch(commentsActions.addComment(newComment));
  };

  const deleteComment = (id: number) => {
    dispatch(commentsActions.onDeleteComment(id));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!isCommentsLoading && <Loader />}

        {isCommentsLoading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isCommentsLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isCommentsLoading && !hasError && comments.length > 0 && (
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

        {isCommentsLoading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => dispatch(commentsActions.setVisible(true))}
          >
            Write a comment
          </button>
        )}

        {isCommentsLoading && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
