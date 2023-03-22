import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { CommentData } from '../types/Comment';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import * as commentsActions from '../features/comments';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {
    comments: commentsState,
    selectedPost: post,
  } = useAppSelector(state => state);
  const {
    loaded,
    hasError,
    items: comments,
  } = commentsState;
  const {
    deleteComment: deleteCommentAction,
    initComments,
    createCommentAsync,
  } = commentsActions;

  // load comments
  useEffect(() => {
    setVisible(false);
    if (!post) {
      return;
    }

    dispatch(initComments(post.id));
  }, [post?.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (!post) {
      return;
    }

    await dispatch(createCommentAsync({
      name,
      email,
      body,
      id: post.id,
    }));
  };

  const deleteComment = (commentId: number) => {
    // we delete the comment immediately so as
    // not to make the user wait long for the actual deletion
    dispatch(deleteCommentAction(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post?.id}: ${post?.title}`}
        </h2>

        <p data-cy="PostBody">
          {post?.body}
        </p>
      </div>

      <div className="block">
        {!loaded && (
          <Loader />
        )}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
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
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
