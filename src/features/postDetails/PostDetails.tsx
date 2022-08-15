import React, { useEffect, useState } from 'react';
import { Loader } from '../../common/Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteComment, fetchComments, postDetails } from './postDetailsSlice';
import Status from '../../enums/Status';
import { NewCommentForm } from '../newCommentForm/NewCommentForm';

export const PostDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { comments, status } = useAppSelector(postDetails);
  const loaded = status === Status.Idle;
  const hasError = status === Status.Failed;

  const [visible, setVisible] = useState(false);

  const { selectedPost: post } = useAppSelector(postDetails);

  useEffect(() => {
    if (!post) {
      return;
    }

    setVisible(false);
    dispatch(fetchComments(post.id));
  }, [post?.id]);

  if (!post) {
    return null;
  }

  return (
    <div className="content">
      <div className="block">
        <h2>
          {`#${post.id}: ${post.title}`}
        </h2>
        <p>{post.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4">No comments yet</p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article className="message is-small" key={comment.id}>
                <div className="message-header">
                  <a href={`mailto:${comment.email}`}>
                    {comment.name}
                  </a>

                  <button
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => dispatch(deleteComment(comment.id))}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
