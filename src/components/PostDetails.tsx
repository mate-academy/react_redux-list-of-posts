import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import {
  fetchPostComments,
  createComment,
  deleteComment,
  selectComments,
} from '../features/comments/commentsSlice';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchPostComments(post.id));
  }, [post.id, dispatch]);

  const addComment = async (data: CommentData) => {
    await dispatch(createComment({ ...data, postId: post.id }));
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  const commentsLoaded = comments.loaded;
  const commentsHasError = comments.loaded && comments.hasError;
  const commentsReady = comments.loaded && !comments.hasError;
  const noComments = commentsReady && comments.items.length === 0;
  const hasComments = commentsReady && comments.items.length > 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!commentsLoaded && <Loader />}

        {commentsHasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {noComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {hasComments && (
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
                    onClick={() => handleDeleteComment(comment.id)}
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

        {commentsReady && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {commentsReady && visible && <NewCommentForm onSubmit={addComment} />}
      </div>
    </div>
  );
};
