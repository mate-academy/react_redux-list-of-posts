import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as commentsActions from '../features/commentsSlice';

export const PostDetails: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentComments, setCurrentComments] = useState<Comment[]>([]);

  const dispatch = useAppDispatch();
  const post = useAppSelector(state => state.selectedPost);
  const {
    comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  const deleteComment = async (commentId: number) => {
    setCurrentComments(com => com
      .filter(comment => comment.id !== commentId));
    await dispatch(commentsActions.removeComment(commentId));
  };

  const addComment = async ({ name, email, body }: CommentData) => {
    if (post) {
      await dispatch(commentsActions.addComment({
        name,
        email,
        body,
        postId: post.id,
      }));
    }
  };

  useEffect(() => {
    if (post) {
      dispatch(commentsActions.setPostComments(post.id));
    }

    setVisible(false);
  }, [post]);

  useEffect(() => {
    setCurrentComments(comments);
  }, [comments]);

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

        {loaded && !hasError && !currentComments.length && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && !!currentComments.length && (
          <>
            <p className="title is-4">Comments:</p>

            {currentComments.map(comment => (
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
