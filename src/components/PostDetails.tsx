import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostDetailsProps } from '../types/PostDetailsProps';
import { client } from '../utils/fetchClient';
import { PostComment, CommentData } from '../types/Comment';

export const PostDetails: React.FC<PostDetailsProps> = ({
  post,
  comments,
  commentsLoading,
  commentsError,
}) => {
  const [localComments, setLocalComments] = useState<PostComment[]>(comments);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  if (!post) {
    return <p data-cy="NoPostSelected">No post selected</p>;
  }

  const handleAdd = async (data: CommentData): Promise<PostComment> => {
    setError(null);
    try {
      const added = await client.comments.add(data);

      setLocalComments(prev => [added, ...prev]);

      return added;
    } catch {
      setError('Failed to add comment');
      throw new Error('Failed to add comment');
    }
  };

  const handleDelete = async (id: number) => {
    const deletedComment = localComments.find(c => c.id === id);

    if (!deletedComment) {
      return;
    }

    setLocalComments(prev => prev.filter(c => c.id !== id));
    setError(null);

    try {
      await client.comments.delete(id);
    } catch {
      setLocalComments(prev => [deletedComment, ...prev]);
      setError('Failed to delete comment. Try again.');
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {commentsLoading && <Loader data-cy="Loader" />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentsError || error}
            </div>
          )}

          {!commentsLoading && !commentsError && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!commentsLoading && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
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
                      aria-label="delete"
                      onClick={() => handleDelete(comment.id)}
                    >
                      delete button
                    </button>
                  </div>
                </article>
              ))}
            </>
          )}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
          >
            Write a comment
          </button>
        </div>

        <NewCommentForm onSubmit={handleAdd} />
      </div>
    </div>
  );
};
