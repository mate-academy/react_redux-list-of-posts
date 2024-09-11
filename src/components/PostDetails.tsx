import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { useDispatch } from 'react-redux';
import {
  deleteCommentById,
  deleteCommentLocally,
  fetchComments,
} from '../features/commentsSlice';
import { useAppSelector } from '../app/hooks';
import { LoadingStatuses } from '../enums/LoadingStatuses';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { loading, idle, error } = LoadingStatuses;
  const { commentsLoadingStatus, comments } = useAppSelector(
    state => state.comments,
  );
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const deleteCommentOnClick = (commentId: number) => {
    dispatch(deleteCommentLocally(commentId));
    dispatch(deleteCommentById(commentId));
  };

  useEffect(() => {
    if (post.id) {
      dispatch(fetchComments(post.id));
    }
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {commentsLoadingStatus === loading && !visible && <Loader />}

        {commentsLoadingStatus === error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {commentsLoadingStatus === idle && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {commentsLoadingStatus === idle && comments.length > 0 && (
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
                    onClick={() => dispatch(deleteCommentOnClick(comment.id))}
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

        {commentsLoadingStatus === idle && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {commentsLoadingStatus === idle && visible && (
          <NewCommentForm postId={post.id} />
        )}
      </div>
    </div>
  );
};
