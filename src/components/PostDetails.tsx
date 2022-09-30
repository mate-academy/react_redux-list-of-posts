import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import * as commentsActions from '../features/commentsSlice';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';
import { Post } from '../types/Post';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();
  const { loaded, hasError } = useAppSelector(state => state.comments);
  const comments = useAppSelector(state => state.comments.items);

  function loadComments() {
    dispatch(commentsActions.setLoaded(false));
    setVisible(false);

    commentsApi.getPostComments(post.id)
      .then(commentsFromServer => dispatch(
        commentsActions.setComments(commentsFromServer),
      ))
      .catch(() => dispatch(commentsActions.setError(true)))
      .finally(() => dispatch(commentsActions.setLoaded(true)));
  }

  useEffect(loadComments, [post.id]);

  const addComment = ({ name, email, body }: CommentData) => {
    const newComment: Comment = {
      name,
      email,
      body,
      postId: post.id,
    };

    commentsApi.createComment(newComment)
      .then(comment => {
        if (!comment.id) {
          setErrorMessage('Unable to add a comment');

          return;
        }

        dispatch(commentsActions.setComments([...comments, comment]));
      })
      .catch(() => setErrorMessage('Something went wrong!'));
  };

  const handleDeleteBtnClick = (commentId = 0) => {
    if (commentId !== 0) {
      const copyComments = [...comments];

      dispatch(commentsActions.setComments(comments.filter(
        comment => comment.id !== commentId,
      )));

      commentsApi.deleteComment(commentId)
        .then(deletedComment => {
          if (deletedComment && typeof deletedComment === 'object') {
            if (Object.values(deletedComment).includes('Not Found')) {
              setErrorMessage('Unable to delete a comment');
              dispatch(commentsActions.setComments(copyComments));
            }
          }
        })
        .catch(() => setErrorMessage('Something went wrong!'));
    }
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

        {errorMessage
          && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
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
                    onClick={() => handleDeleteBtnClick(comment.id)}
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
