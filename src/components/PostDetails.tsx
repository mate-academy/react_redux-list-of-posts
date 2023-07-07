import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsApi from '../api/comments';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/comments/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const comments = useAppSelector(commentsActions.selectedComments);
  const status = useAppSelector(state => state.comments.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setVisible(false);

    dispatch(commentsActions.incrementAsync(post.id));
  }, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId: post.id,
    });

    dispatch(commentsActions.add(newComment));
  };

  const deleteComment = async (commentId: number) => {
    dispatch(commentsActions.remove(commentId));

    await commentsApi.deleteComment(commentId);
  };

  const loading = status === 'loading';
  const hasError = status === 'failed';

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {loading && (
          <Loader />
        )}

        {!loading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !hasError && comments.length > 0 && (
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

        {!loading && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!loading && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
