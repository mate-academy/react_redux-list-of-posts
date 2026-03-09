import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsActions from '../features/comments';

import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const { items, loaded, hasError } = useAppSelector(state => state.comments);

  useEffect(() => {
    setVisible(false);
    dispatch(commentsActions.init(post.id));
  }, [dispatch, post.id]);

  const addComment = async (data: CommentData) => {
    try {
      await dispatch(
        commentsActions.addCommentAsync({
          ...data,
          postId: post.id,
        }),
      ).unwrap();

      setVisible(false);
    } catch {}
  };

  const deleteComment = async (commentId: number) => {
    try {
      await dispatch(commentsActions.deleteCommentAsync(commentId)).unwrap();
    } catch {
      // we can show some error message here and keep the comment in the list
    }
  };

  if (loaded) {
    return <Loader />;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!hasError && items.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!hasError && items.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {items.map(item => (
              <article
                className="message is-small"
                key={item.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${item.email}`} data-cy="CommentAuthor">
                    {item.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(item.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {item.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!hasError && visible && <NewCommentForm onSubmit={addComment} />}
      </div>
    </div>
  );
};
