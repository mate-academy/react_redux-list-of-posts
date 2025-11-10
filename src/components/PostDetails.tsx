import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  deleteComment,
  fetchComments,
} from '../slices/commentsSlice';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

type Props = { post: Post };

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const {
    items: comments,
    loaded,
    hasError,
    postId,
  } = useAppSelector(s => s.comments);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(fetchComments(post.id));
  }, [post.id, dispatch]);

  const handleAdd = async (data: CommentData) => {
    await dispatch(addComment({ data, postId: post.id }));
  };

  const handleDelete = async (commentId: number) => {
    await dispatch(deleteComment(commentId));
  };

  const handleDeleteClick = (id: number) => () => {
    handleDelete(id);
  };

  const isCurrent = postId === post.id;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && isCurrent && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && isCurrent && comments.length > 0 && (
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
                    onClick={handleDeleteClick(comment.id)}
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
          <NewCommentForm onSubmit={handleAdd} />
        )}
      </div>
    </div>
  );
};
