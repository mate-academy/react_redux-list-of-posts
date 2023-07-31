import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { thunks } from '../redux/slices/commentsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { addComment, fetchComments, removeComment } = thunks;

  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { comments, selectedPost } = useAppSelector(state => state);

  const {
    items,
    hasError,
    loaded,
    created,
  } = comments;

  useEffect(() => {
    dispatch(fetchComments(post.id));
    setVisible(false);
  }, [post.id]);

  const onAddComment = async (comment: CommentData) => {
    await dispatch(addComment({
      postId: selectedPost.data?.id as number,
      data: comment,
    }));
  };

  const onDeleteComment = async (commentId: number) => {
    await dispatch(removeComment(commentId));
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
        {!loaded && items.length === 0 && (
          <Loader />
        )}

        {(loaded || created) && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {(loaded && !hasError && items.length === 0) && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {(!hasError && loaded && items.length > 0) && (
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
                    onClick={() => onDeleteComment(comment.id)}
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

        {(visible && !hasError) && (
          <NewCommentForm onSubmit={onAddComment} />
        )}
      </div>
    </div>
  );
};
