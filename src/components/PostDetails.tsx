import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsActions from '../redux/slices/commentsSlice';
import { Post } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Comment, CommentData } from '../types/Comment';
import { selectComments } from '../redux/selectors';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { items, hasError, loaded } = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(commentsActions.fetchComments(post.id));
    setVisible(false);
  }, [post.id]);

  const onAddComment = async (comment: CommentData) => {
    const newComment: Omit<Comment, 'id'> = {
      ...comment,
      postId: post.id,
    };

    await dispatch(commentsActions.addComment(newComment));
  };

  const onDeleteComment = (commentId: number) => {
    dispatch(commentsActions.removeComment(commentId));
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
        {!loaded && !items.length && (
          <Loader />
        )}

        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {(loaded && !hasError && !items.length) && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {(!hasError && items.length > 0) && (
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
