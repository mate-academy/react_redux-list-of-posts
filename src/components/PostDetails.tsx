import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { actions as commentsActions } from '../features/commentsSlice';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { useAppSelector } from '../app/hooks';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch();
  const {
    comments,
    loaded,
    hasError,
  } = useAppSelector(state => state.comments);

  const [visible, setVisible] = useState(false);

  const loadComments = async () => {
    dispatch(commentsActions.setLoaded(false));
    dispatch(commentsActions.setError(false));
    setVisible(false);

    try {
      const commentsFromServer = await commentsApi.getPostComments(post.id);

      dispatch(commentsActions.setComments(commentsFromServer));
    } catch {
      dispatch(commentsActions.setError(true));
    } finally {
      dispatch(commentsActions.setLoaded(true));
    }
  };

  useEffect(() => {
    loadComments();
  }, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      dispatch(commentsActions.addComment(newComment));
    } catch (error) {
      dispatch(commentsActions.setError(true));
    }
  };

  const deleteComment = async (comment: Comment) => {
    dispatch(commentsActions.removeComment(comment));

    await commentsApi.deleteComment(comment.id);
  };

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
        {!loaded && (
          <Loader />
        )}

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
                    onClick={() => deleteComment(comment)}
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
