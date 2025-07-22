import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  fetchComments,
  removeComment,
} from '../features/comments/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchComments(post.id));

    setIsFormVisible(false);
  }, [post.id, dispatch]);

  const {
    items: comments,
    loading,
    error,
    adding,
    isDeleting,
  } = useAppSelector(state => state.comments);

  const handleAddComment = async (data: CommentData) => {
    await dispatch(addComment({ ...data, postId: post.id }));
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(removeComment(commentId));
  };

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
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {comments.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {comments.length > 0 && (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <article
                    className="message is-small"
                    key={comment.id}
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
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={isDeleting}
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

            {!isFormVisible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormVisible(true)}
              >
                Write a comment
              </button>
            )}

            {isFormVisible && (
              <NewCommentForm onSubmit={handleAddComment} isAdding={adding} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
