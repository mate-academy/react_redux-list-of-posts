import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addComment, removeComment, loadComments } from '../features/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { items, loaded, hasError } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    dispatch(loadComments(post.id));
  }, [dispatch, post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!loaded && !hasError && <Loader />}

        {!loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && items.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {loaded && !hasError && items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {items.map(comment => (
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
                    onClick={async () => {
                      await commentsApi.deleteComment(comment.id);
                      dispatch(removeComment(comment.id));
                    }}
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

        { loaded && !hasError && visible && (
          <NewCommentForm
            onSubmit={async commentData => {
              const newComment = await commentsApi.createComment({
                ...commentData,
                postId: post.id,
              });

              dispatch(addComment(newComment));
            }}
          />
        )}
      </div>
    </div>
  );
};
