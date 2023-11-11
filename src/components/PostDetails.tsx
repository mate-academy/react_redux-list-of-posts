import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

// import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
// import { Comment, CommentData } from '../types/Comment';

import {
  loadComments,
  addComment,
  deleteComment,
} from '../features/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  // const comments = useAppSelector<Comment[]>(state => state.comments);
  const comments = useAppSelector(state => state.comments.value);
  const status = useAppSelector(state => state.comments.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadComments(post.id));
  },
  [post.id]);

  const handleAddingComment = async ({ name, email, body }: CommentData) => {
    dispatch(addComment({
      name,
      email,
      body,
      postId: post.id,
    }));
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
        {status === 'loading' && (
          <Loader />
        )}

        {status === 'failed' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {status === 'idle' && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {status === 'idle' && comments.length > 0 && (
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

        {status === 'idle' && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {status === 'idle' && visible && (
          <NewCommentForm onSubmit={handleAddingComment} />
        )}
      </div>
    </div>
  );
};
