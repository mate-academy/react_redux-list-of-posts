import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  loadComments,
  removeComment,
} from '../features/commentsSlice';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  const comments = useAppSelector(state => state.comments.items);
  const loaded = useAppSelector(state => state.comments.loaded);
  const hasError = useAppSelector(state => state.comments.hasError);

  const isLoading = !loaded && !hasError;
  const isSuccess = loaded && !hasError;

  useEffect(() => {
    if (!post?.id) {
      return;
    }

    setVisible(false);
    dispatch(loadComments(post.id));
  }, [dispatch, post.id]);

  const handleAddComment = async (data: CommentData) => {
    await dispatch(addComment({ ...data, postId: post.id }));
  };

  const handleRemoveComment = async (commentId: number) => {
    await dispatch(removeComment(commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isSuccess && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isSuccess && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                data-cy="Comment"
                key={comment.id}
                className="message is-small"
              >
                <div className="message-header">
                  <a data-cy="CommentAuthor" href={`mailto:${comment.email}`}>
                    {comment.name}
                  </a>

                  <button
                    className="delete is-small"
                    onClick={() => handleRemoveComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div data-cy="CommentBody" className="message-body">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {isSuccess && !visible && (
          <button
            data-cy="WriteCommentButton"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isSuccess && visible && <NewCommentForm onSubmit={handleAddComment} />}
      </div>
    </div>
  );
};
