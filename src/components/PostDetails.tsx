import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchComments,
  deleteComment,
  addComment,
} from '../features/comments/commentsSlice';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { RootState, AppDispatch } from '../app/store';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: comments,
    loaded,
    hasError,
  } = useSelector((state: RootState) => state.comments);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (post) {
      dispatch(fetchComments(post.id));
    }

    setVisible(false);
  }, [dispatch, post]);

  const handleAddComment = async (data: CommentData): Promise<void> => {
    await dispatch(addComment({ postId: post.id, data }));
  };

  const handleDeleteComment = async (commentId: number): Promise<void> => {
    dispatch(deleteComment(commentId));
  };

  const toggleCommentForm = () => {
    setVisible(current => !current);
  };

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
                    data-cy="DeleteCommentButton"
                    type="button"
                    className="delete is-small"
                    onClick={() => handleDeleteComment(comment.id)}
                  />
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
            onClick={toggleCommentForm}
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
