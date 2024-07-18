import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  deleteComment,
  fetchComments,
  setComments,
} from '../features/commentSlice';
import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { comments, loaded, hasError } = useAppSelector(state => state.comment);

  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  const loadComments = () => {
    setVisible(false);

    dispatch(fetchComments(post.id));
  };

  useEffect(loadComments, [post.id, dispatch]);

  const handleAddComment = async ({ name, email, body }: CommentData) => {
    const newComment = { name, email, body, postId: post.id };

    dispatch(addComment(newComment));
  };

  const handleDeleteComment = async (commentId: number) => {
    const deletedComment = comments.filter(comment => comment.id !== commentId);

    dispatch(setComments(deletedComment));

    dispatch(deleteComment(commentId));
  };

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
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
