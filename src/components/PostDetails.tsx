import { useEffect, useState } from 'react';

import { NewCommentForm } from './NewCommentForm';
import { Loader } from './Loader';

import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
  loadComments,
  addComment,
  deleteComment,
} from '../features/comments/commentsSlice';

import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  post: Post | null;
};

export const PostDetails = ({ post }: Props) => {
  const dispatch = useAppDispatch();

  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    dispatch(loadComments(post.id));
    setVisible(false);
  }, [post, dispatch]);

  if (!post) {
    return null;
  }

  const handleAddComment = (data: CommentData) => {
    dispatch(
      addComment({
        ...data,
        postId: post.id,
      }),
    );
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  return (
    <div
      className="content"
      data-cy="PostDetails"
    >
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p
            className="title is-4"
            data-cy="NoCommentsMessage"
          >
            No comments yet
          </p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">
              Comments:
            </p>

            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a
                    href={`mailto:${comment.email}`}
                    data-cy="CommentAuthor"
                  >
                    {comment.name}
                  </a>

                  <button
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    data-cy="CommentDelete"
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                </div>

                <div
                  className="message-body"
                  data-cy="CommentBody"
                >
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
            type="button"
            className="button is-link"
            data-cy="WriteCommentButton"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm
            postId={post.id}
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
