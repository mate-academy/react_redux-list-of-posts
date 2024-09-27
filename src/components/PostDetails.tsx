import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchCreatePostComment,
  fetchDeletePostComment,
  fetchPostComments,
} from '../slices/commentSlice';
import { NewCommentForm } from './NewCommentForm';
import { Loader } from './Loader';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visible, setVisible] = useState(false);

  const {
    items: comments,
    hasError,
    loaded,
  } = useAppSelector(state => state.comment);
  const dispatch = useAppDispatch();
  async function loadComments() {
    setVisible(false);
    await dispatch(fetchPostComments(post.id));
  }

  const handleAddComment = async ({ name, email, body }: CommentData) => {
    const newComment = {
      name,
      email,
      body,
      postId: post.id,
    };

    await dispatch(fetchCreatePostComment(newComment));
  };

  const handleDeleteComment = async (commentId: number) => {
    await dispatch(fetchDeletePostComment(commentId));
  };

  useEffect(() => {
    loadComments();
  }, [post.id, dispatch]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>
      <div className="block">
        {!loaded && <Loader />}
        {loaded && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}
        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {loaded && !hasError && comments.length > 0 && (
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
                    onClick={() => handleDeleteComment(comment.id)}
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

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
