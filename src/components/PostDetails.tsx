import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  initPostComments,
  addComment,
  removeComment,
} from '../features/commentsSlice';
import { Status } from '../types/Status';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { comments, status } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    if (post) {
      dispatch(initPostComments(post.id));
    }
  }, [dispatch, post]);

  const handleAddComment = async (data: CommentData) => {
    const newComment = {
      ...data,
      postId: post.id,
    };

    await dispatch(addComment(newComment));
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(removeComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {status === Status.loading && <Loader />}

        {status === Status.failed && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {status === Status.idle && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {status === Status.idle && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(({ id, email, name, body }) => (
              <article className="message is-small" key={id} data-cy="Comment">
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {body}
                </div>
              </article>
            ))}
          </>
        )}

        {status === Status.idle && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {visible && <NewCommentForm onSubmit={handleAddComment} />}
      </div>
    </div>
  );
};
