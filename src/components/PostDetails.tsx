import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { useAppDispatch } from '../app/hooks';
import {
  asyncDeleteComment,
  asyncGetCommnets,
  delComment,
} from '../features/Comments/commentsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const comments = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(asyncGetCommnets(post.id));
  }, [post.id, dispatch]);

  useEffect(() => {
    setVisible(false);
  }, [post]);

  const handleDelComment = (comment: Comment) => {
    dispatch(delComment(comment.id));
    dispatch(asyncDeleteComment(comment.id));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {comments.status === 'loading' && <Loader />}

        {comments.status === 'failed' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {comments.status === 'idle' && comments.value.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.status === 'idle' && comments.value.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.value.map(comment => (
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
                    onClick={() => handleDelComment(comment)}
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

        {comments.status === 'idle' && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {comments.status === 'idle' && visible && <NewCommentForm />}
      </div>
    </div>
  );
};
