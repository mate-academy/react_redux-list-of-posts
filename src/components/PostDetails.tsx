import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { useAppSelector } from '../app/hooks';

export const PostDetails: React.FC = () => {
  const { post } = useAppSelector(state => state.selectedPost);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  function loadComments() {
    if (post) {
      setLoaded(false);
      setError(false);
      setVisible(false);

      commentsApi
        .getPostComments(post.id)
        .then(setComments)
        .catch(() => setError(true))
        .finally(() => setLoaded(true));
    }
  }

  useEffect(loadComments, [post]);

  const addComment = async ({ name, email, body }: CommentData) => {
    if (post) {
      try {
        const newComment = await commentsApi.createComment({
          name,
          email,
          body,
          postId: post.id,
        });

        setComments(currentComments => [...currentComments, newComment]);
      } catch (error) {
        setError(true);
      }
    }
  };

  const deleteComment = async (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    await commentsApi.deleteComment(commentId);
  };

  if (!post) {
    return (
      <div className="content" data-cy="PostDetails">
        Choose a post
      </div>
    );
  }

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
