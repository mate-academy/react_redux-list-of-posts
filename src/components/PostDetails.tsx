import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchDeleteComment,
  fetchComments,
  fetchCreateComment,
} from '../features/commentsSlice';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  formVisible: boolean;
  setFormVisible: (visible: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  formVisible,
  setFormVisible,
}) => {
  const dispatch = useAppDispatch();
  const { comments, fetchStatus, fetchError, createStatus } = useAppSelector(
    state => state.comments,
  );

  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, [post.id, dispatch]);

  const addComment = (data: Omit<Comment, 'id' | 'postId'>) => {
    const newComment = {
      ...data,
      postId: post.id,
    };

    dispatch(fetchCreateComment(newComment));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {fetchStatus === 'loading' && <Loader />}

        {fetchStatus === 'failed' && fetchError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {fetchStatus === 'succeeded' && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {fetchStatus === 'succeeded' && comments.length > 0 && (
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
                    onClick={() => dispatch(fetchDeleteComment(comment.id))}
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

        {fetchStatus === 'succeeded' && !formVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {fetchStatus === 'succeeded' && formVisible && (
          <NewCommentForm onSubmit={addComment} status={createStatus} />
        )}
      </div>
    </div>
  );
};
