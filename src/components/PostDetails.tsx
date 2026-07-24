import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchComments, removeComment } from '../features/slices';
import { client } from '../utils/fetchClient';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.selectedPost);
  const {
    items: comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (post) {
      setShowForm(false);
      dispatch(fetchComments(post.id));
    }
  }, [post, dispatch]);

  const handleDelete = (commentId: number) => {
    dispatch(removeComment(commentId));
    client.delete(`/comments/${commentId}`).catch(() => {
      alert('Error deleting comment, bro!');
      if (post) {
        dispatch(fetchComments(post.id));
      }
    });
  };

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length > 0 && <p className="title is-4">Comments:</p>}

        {comments.map(comment => (
          <article
            className="message is-small"
            data-cy="Comment"
            key={comment.id}
          >
            <div className="message-header">
              <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                {comment.name}
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                onClick={() => handleDelete(comment.id)}
              >
                delete
              </button>
            </div>
            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))}

        {!showForm && loaded && !hasError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {showForm && <NewCommentForm postId={post.id} />}
    </div>
  );
};
